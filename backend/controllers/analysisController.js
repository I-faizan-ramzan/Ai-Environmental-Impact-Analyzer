const Entry = require('../models/Entry');

// @desc    Analyze product and store entry
// @route   POST /api/analyze
// @access  Public (for now)
exports.analyzeProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productName, description, supplierInfo } = req.body;

    if (!productName || !description) {
      return res.status(400).json({ error: 'Please provide productName and description' });
    }

    // TODO: Connect this to the actual Python AI service instead of a mock output
    // Mocking an AI scoring mechanism (1 to 100, where lower is better)
    const mockFootprintScore = Math.floor(Math.random() * 80) + 10;
    
    // Mocking detailed breakdown
    const mockAnalysisDetails = {
      carbonEmissions: `${Math.floor(Math.random() * 50)} kg CO2`,
      waterUsage: `${Math.floor(Math.random() * 200)} Liters`,
      recyclability: Math.random() > 0.5 ? 'High' : 'Low',
      summary: 'This product has an average environmental impact. Materials could be sourced more sustainably.',
    };

    const newEntry = await Entry.create({
      userId,
      productName,
      description,
      supplierInfo: supplierInfo || "",
      footprintScore: mockFootprintScore,
      analysisDetails: mockAnalysisDetails,
    });

    res.status(201).json({
      success: true,
      data: newEntry,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error during analysis' });
  }
};

// @desc    Get all analysis history for a user
// @route   GET /api/history/:userId
// @access  Public (for now)
exports.getHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ error: 'Please provide a userId' });
    }

    const entries = await Entry.find({ userId }).sort({ createdAt: -1 });

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
