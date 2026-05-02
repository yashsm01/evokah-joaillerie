'use strict';
const { Company } = require('../models');

/**
 * Middleware to extract the company tenant from the request.
 * It checks the 'x-company-id' header or falls back to the default company ('evokah')
 * for ease of local development. In production, this can also check req.hostname.
 */
async function identifyTenant(req, res, next) {
  try {
    let companyId = req.headers['x-company-id'];
    let company;

    if (companyId) {
      company = await Company.findByPk(companyId);
    } else {
      // Fallback for development / mock data testing
      company = await Company.findOne({ where: { slug: 'evokah' } });
    }

    if (!company) {
      return res.status(400).json({ message: 'Tenant / Company not found. Please provide a valid x-company-id header.' });
    }

    if (!company.isActive) {
      return res.status(403).json({ message: 'This company account is currently inactive.' });
    }

    req.tenant = company;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Internal server error during tenant identification.', error: err.message });
  }
}

module.exports = identifyTenant;
