const resetCode = 1 + Math.floor(Math.random() * 10000);

exports.emailTemplate = `<h1>You requested for password reset </h1><p>\
If you have requested to reset your password then use the code below to reset password for your account<br/>\
<h1>${resetCode}</h1><br/>\
This code will expire within 1 hour.<br/>\
</p>`