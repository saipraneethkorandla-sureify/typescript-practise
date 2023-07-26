"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.details = void 0;
var details;
(function (details) {
    function updateDetailsView(userInfo) {
        const fullNameTag = document.getElementById('details_fullname');
        alert(userInfo.fullname);
        fullNameTag.innerHTML = userInfo.fullname;
    }
    details.updateDetailsView = updateDetailsView;
})(details || (exports.details = details = {}));
