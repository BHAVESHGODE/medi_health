// Simple triage scoring based on vitals and symptoms count
const EmergencyCase = require('../models/EmergencyCase');

function scoreCase(data) {
  let score = 0;
  if (data.heartRate && (data.heartRate < 50 || data.heartRate > 130)) score += 3;
  if (data.sbp && (data.sbp < 90 || data.sbp > 200)) score += 3;
  if (data.spo2 && data.spo2 < 90) score += 3;
  if (data.temp && (data.temp > 39.5 || data.temp < 35)) score += 2;
  if (Array.isArray(data.symptoms)) score += Math.min(3, data.symptoms.length);
  if (data.isUnconscious) score += 4;
  return score;
}

function toPriority(score) {
  if (score >= 8) return 'critical';
  if (score >= 5) return 'urgent';
  if (score >= 3) return 'semi-urgent';
  return 'non-urgent';
}

exports.assess = async (req, res) => {
  try {
    const payload = req.body || {};
    const score = scoreCase(payload);
    const priority = toPriority(score);

    // Optionally attach to an emergency case
    let updated;
    if (payload.caseId) {
      updated = await EmergencyCase.findByIdAndUpdate(payload.caseId, { triage: { score, priority, at: new Date() } }, { new: true });

      const io = req.app.get('io');
      io.emit('triage:update', { caseId: payload.caseId, score, priority });
    }

    res.json({ success: true, data: { score, priority, updated } });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.board = async (req, res) => {
  try {
    const cases = await EmergencyCase.find({}).sort({ updatedAt: -1 }).limit(200);
    res.json({ success: true, data: cases });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
