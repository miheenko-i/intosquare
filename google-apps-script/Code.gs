// Deploy as a Web app: execute as owner; access Anyone.
// The spreadsheet remains private. This endpoint only accepts launch signups.
var SHEET_ID = 'REPLACE_WITH_PRIVATE_SPREADSHEET_ID';
var RECIPIENT = 'hello@intosquare.app';
var CONSENT = 'Please email me when IntoSquare is released.';
function json_(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
function doGet() { return json_({ok:true,service:'IntoSquare launch signup'}); }
function cleanEmail_(value) {
  if(typeof value !== 'string') return null;
  var email=value.trim().toLowerCase();
  return email.length<=254 && /^[a-z0-9.!#$%&'*+/?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/.test(email) ? email : null;
}
function safeCell_(value) { return /^[=+@-]/.test(value) ? "'"+value : value; }
function sheet_() { return SpreadsheetApp.openById(SHEET_ID).getSheetByName('Subscribers'); }
function sendPending_(sheet,row,email) {
  if(sheet.getRange(row,5).getValue()==='sent') return true;
  if(MailApp.getRemainingDailyQuota()<1) return false;
  try {
    MailApp.sendEmail({to:RECIPIENT,subject:'IntoSquare — new launch signup',body:'New IntoSquare launch request\n\nEmail: '+email+'\nLaunch: October 2026\nConsent: '+CONSENT+'\n\nSaved in the private launch list.',name:'IntoSquare launch form'});
    sheet.getRange(row,5,1,2).setValues([['sent',new Date().toISOString()]]);
    return true;
  } catch(error) { return false; }
}
function doPost(e) {
  var lock=LockService.getScriptLock();
  if(!lock.tryLock(10000)) return json_({ok:false,error:'busy'});
  try {
    var raw=e&&e.postData&&e.postData.contents;
    if(!raw||raw.length>2048) return json_({ok:false,error:'invalid'});
    var data;try{data=JSON.parse(raw);}catch(error){return json_({ok:false,error:'invalid'});}
    var email=cleanEmail_(data.email);
    if(!email||data.consent!==CONSENT||data.website||data.source!=='intosquare-launch-2026-10') return json_({ok:false,error:'invalid'});
    var sheet=sheet_();if(!sheet) return json_({ok:false,error:'unavailable'});
    var last=sheet.getLastRow();
    var emails=last>1?sheet.getRange(2,1,last-1,1).getDisplayValues():[];
    var found=emails.findIndex(function(row){return String(row[0]).replace(/^'/,'').toLowerCase()===email;});
    var row=found<0?last+1:found+2;
    if(found<0) {
      var cache=CacheService.getScriptCache();var bucket='signups-'+Math.floor(Date.now()/60000);var count=Number(cache.get(bucket)||0);
      if(count>=20) return json_({ok:false,error:'rate-limit'});
      cache.put(bucket,String(count+1),120);
      sheet.getRange(row,1,1,6).setNumberFormat('@').setValues([[safeCell_(email),new Date().toISOString(),CONSENT,'intosquare-launch-2026-10','pending','']]);
      SpreadsheetApp.flush();
    }
    sendPending_(sheet,row,email);
    // Success confirms persistent storage; email notifications can be retried from the owner account.
    return json_({ok:true});
  } catch(error) { return json_({ok:false,error:'unavailable'}); }
  finally { lock.releaseLock(); }
}
function retryPendingNotifications() {
  var lock=LockService.getScriptLock();if(!lock.tryLock(10000)) return;
  try {
    var sheet=sheet_();var last=sheet.getLastRow();if(last<2)return;
    var rows=sheet.getRange(2,1,last-1,5).getDisplayValues();
    for(var i=0;i<rows.length;i++){
      if(MailApp.getRemainingDailyQuota()<1)break;
      if(rows[i][4]!=='sent')sendPending_(sheet,i+2,String(rows[i][0]).replace(/^'/,''));
    }
  } finally {lock.releaseLock();}
}
