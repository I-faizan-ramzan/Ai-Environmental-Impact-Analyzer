const BehaviorLog = require('../models/BehaviorLog');
const User = require('../models/User');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Helper to calculate level based on points
const calculateLevel = (points) => {
  return Math.floor(points / 50) + 1; // Level up every 50 points
};

// @desc    Analyze human behavior and store log
// @route   POST /api/analyze
// @access  Public (should be private in prod)
exports.analyzeBehavior = async (req, res) => {
  try {
    const userId = req.user._id;
    const { electricityUsage, waterUsage, wasteGeneration, travelDistance, travelMode, dietType } = req.body;

    if (electricityUsage === undefined || waterUsage === undefined) {
      return res.status(400).json({ error: 'Please provide all behavior attributes' });
    }

    // Connect to Google Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const prompt = `
      You are an expert Environmental Impact Analyst and Personal Climate Coach.
      Analyze the following weekly user behavior:
      - Electricity Usage: ${electricityUsage} kWh
      - Water Usage: ${waterUsage} Liters
      - Waste Generation: ${wasteGeneration} kg
      - Travel: ${travelDistance} km via ${travelMode}
      - Diet: ${dietType}

      TASK: Generate a comprehensive personal environmental analysis.
      1. footprintScore: A number from 1 (Green / Excellent) to 100 (Disaster / Terrible) representing their eco-impact.
      2. keyFindings: An array of 3 specific bullet points highlighting harmful habits or positive lifestyle choices based on their exact input.
      3. alternatives: An array of 3 personalized recommendations with { title, desc } to improve their habits.

      You MUST format your response as a valid RAW JSON object matching this exact schema:
      {
        "footprintScore": <number>,
        "keyFindings": ["finding 1", "finding 2", "finding 3"],
        "alternatives": [
          {"title": "Alternative 1", "desc": "description..."},
          {"title": "Alternative 2", "desc": "description..."},
          {"title": "Alternative 3", "desc": "description..."}
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    let textResponse = result.response.text();
    textResponse = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();

    let genData;
    try {
      genData = JSON.parse(textResponse);
    } catch (parseErr) {
      console.error('Failed to parse Gemini response:', textResponse);
      return res.status(500).json({ error: 'Failed to process AI response' });
    }

    const analysisDetails = {
      keyFindings: genData.keyFindings,
      alternatives: genData.alternatives,
    };

    const newLog = await BehaviorLog.create({
      userId,
      electricityUsage: Number(electricityUsage),
      waterUsage: Number(waterUsage),
      wasteGeneration: Number(wasteGeneration),
      travelDistance: Number(travelDistance),
      travelMode,
      dietType,
      footprintScore: genData.footprintScore,
      analysisDetails: analysisDetails,
    });

    // Gamification Logic: Award user +10 points for analyzing
    const user = await User.findById(userId);
    if(user) {
      user.points += 10;
      user.level = calculateLevel(user.points);
      await user.save();
    }

    res.status(201).json({
      success: true,
      data: newLog,
      pointsEarned: 10,
      newTotalPoints: user ? user.points : 0
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error during analysis' });
  }
};

// @desc    Get all behavior histories for a user
// @route   GET /api/history
// @access  Private
exports.getHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ error: 'Please provide a userId' });
    }

    const entries = await BehaviorLog.find({ userId, isHiddenForUser: false }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: entries.length,
      data: entries,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error retrieving history' });
  }
};

// @desc    Soft Delete my specific history entry (Hide from user, keep for admin)
// @route   DELETE /api/history/:id
// @access  Private
exports.deleteMyEntry = async (req, res) => {
  try {
    const entry = await BehaviorLog.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { isHiddenForUser: true },
      { returnDocument: 'after' }
    );

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found or unauthorized' });
    }

    res.json({ message: 'History item hidden for user' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error hiding history item' });
  }
};

// @desc    Clear all my history (Hide from user, keep for admin)
// @route   DELETE /api/history
// @access  Private
exports.clearMyHistory = async (req, res) => {
  try {
    await BehaviorLog.updateMany(
      { userId: req.user._id, isHiddenForUser: false },
      { isHiddenForUser: true }
    );
    res.json({ message: 'All personal history hidden' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error hiding personal history' });
  }
};
