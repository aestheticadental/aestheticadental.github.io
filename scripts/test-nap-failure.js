#!/usr/bin/env node
/**
 * NAP FAILURE REGRESSION TEST
 * Validates that scripts/seo-audit.js strictly fails (exit code 1)
 * if any component of the NAP is violated.
 * 
 * Target NAP:
 * Address: 1st floor, Shop no 103, Swaraaj Heights, Kate Wasti Rd, opp. Legacy IVy, Kate Wasti, Punawale, Pimpri-Chinchwad, Maharashtra 411033
 * Phone: 092266 80164
 * Hours: Monday-Sunday 10:15 am–8:30 pm
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const TEST_FILE = path.join(ROOT_DIR, 'sterilization-patient-safety.html');
const ORIGINAL_CONTENT = fs.readFileSync(TEST_FILE, 'utf8');

console.log('=============================================================');
console.log('  NAP FAILURE TEST HARNESS — ASSERTING STRICT ENFORCEMENT    ');
console.log('=============================================================\n');

function runAuditExpectFail(scenarioName) {
  try {
    execSync('node scripts/seo-audit.js', { cwd: ROOT_DIR, stdio: 'pipe' });
    console.error(`  ❌ FAILED: Expected audit to FAIL for "${scenarioName}", but it passed!`);
    process.exit(1);
  } catch (err) {
    console.log(`  ✓ PASS: Audit strictly FAILED as required for "${scenarioName}" (Exit code: ${err.status}).`);
  }
}

let passedScenarios = 0;

try {
  // Scenario 1: Corrupt phone number
  console.log('Test Scenario 1: Corrupt Phone Number (092266 00000)');
  const corruptedPhoneContent = ORIGINAL_CONTENT.replace(/092266 80164/g, '092266 00000');
  fs.writeFileSync(TEST_FILE, corruptedPhoneContent, 'utf8');
  runAuditExpectFail('Corrupt Phone Number');
  passedScenarios++;

  // Scenario 2: Legacy phone number
  console.log('\nTest Scenario 2: Deprecated Legacy Phone (9011016358)');
  const legacyPhoneContent = ORIGINAL_CONTENT.replace(/092266 80164/g, '9011016358');
  fs.writeFileSync(TEST_FILE, legacyPhoneContent, 'utf8');
  runAuditExpectFail('Deprecated Legacy Phone');
  passedScenarios++;

  // Scenario 3: Corrupt Address
  console.log('\nTest Scenario 3: Deprecated Address (Vision One Mall)');
  const corruptedAddressContent = ORIGINAL_CONTENT.replace(/Swaraaj Heights/g, 'Vision One Mall');
  fs.writeFileSync(TEST_FILE, corruptedAddressContent, 'utf8');
  runAuditExpectFail('Deprecated Address');
  passedScenarios++;

  // Scenario 4: Corrupt Clinic Hours
  console.log('\nTest Scenario 4: Non-compliant Clinic Hours (09:00 am–5:00 pm)');
  const corruptedHoursContent = ORIGINAL_CONTENT.replace(/10:15/g, '09:00').replace(/8:30/g, '5:00');
  fs.writeFileSync(TEST_FILE, corruptedHoursContent, 'utf8');
  runAuditExpectFail('Non-compliant Clinic Hours');
  passedScenarios++;

  console.log('\n=============================================================');
  console.log(`  🎉 ALL ${passedScenarios} NAP FAILURE TESTS PASSED!`);
  console.log('  The audit engine strictly blocks any NAP discrepancies.');
  console.log('=============================================================\n');
} finally {
  fs.writeFileSync(TEST_FILE, ORIGINAL_CONTENT, 'utf8');
  console.log('  ✓ Test file restored to original production state.');
}
