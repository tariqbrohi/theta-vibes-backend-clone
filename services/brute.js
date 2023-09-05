Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

let failures = {};
let blockedEmail = {};
function canLogin(remoteIp, bemail) {
  let f = failures[remoteIp];
  let be = blockedEmail[bemail];
  if ((f && Date.now() < f.nextTry) || (be && Date.now() < be.nextTry)) {
    if (f?.count === 3) {
      f.count = 0;
    }
    if (be?.count === 3) {
      be.count = 0;
    }
    return false;
  } else {
    return true;
  }
}

function loginTryCount(remoteIp, bemail) {
  let f = (failures[remoteIp] = failures[remoteIp] || {
    count: 0,
    nextTry: new Date(),
  });
  let be = (blockedEmail[bemail] = blockedEmail[bemail] || {
    count: 0,
    nextTry: new Date(),
  });
  f.count++;
  be.count++;
  if (f.count >= 10) {
    let date = new Date();
    f.nextTry.setTime(date.addHours(1));
  }
  if (be.count >= 10) {
    let date = new Date();
    be.nextTry.setTime(date.addHours(1));
  }
}

function deleteFromFailure(remoteIp) {
  delete failures[remoteIp];
}
function deleteFromBlockedEmail(bemail) {
  delete blockedEmail[bemail];
}

function getRemainingTime(remoteIp, bemail) {
  let timeleftip = failures[remoteIp]?.nextTry.getTime() - new Date().getTime();
  let timeleftemail =
    blockedEmail[bemail]?.nextTry.getTime() - new Date().getTime();
  let timeleft = 0;
  if (timeleftemail <= timeleftip) {
    timeleft = timeleftip;
  } else {
    timeleft = timeleftemail;
  }
  let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let munites = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  return { hours, munites };
}

setInterval(function () {
  for (let ip in failures) {
    if (new Date().getTime() > failures[ip].nextTry.getTime()) {
      delete failures[ip];
    }
  }
  for (let email in blockedEmail) {
    if (new Date().getTime() > blockedEmail[email].nextTry.getTime()) {
      delete blockedEmail[email];
    }
  }
}, 12 * 1000 * 60 * 60);

module.exports = {
  canLogin,
  loginTryCount,
  deleteFromBlockedEmail,
  deleteFromFailure,
  getRemainingTime,
};
