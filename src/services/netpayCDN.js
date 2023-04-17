(function () {
  const I = {}.hasOwnProperty; let p = this.NetPay; const D = function (a, d) { function b() { this.constructor = d; } for (const h in a)I.call(a, h) && (d[h] = a[h]); return b.prototype = a.prototype, d.prototype = new b(), d.__super__ = a.prototype, d; }; p = this.NetPay = function () {
    function a() {} function d(c, g, m, e, f) {
      clearTimeout(g); g = null; m = m || 'Unknown error'; e = e || 0; try { g = JSON.parse(f || '{}'); } catch (l) { m = 'Response error'; }c({
        message: m, status: e, data: g, toString() { return `${this.message} [status ${this.status}]`; },
      });
    } function b(
      c,
      g,
    ) { return void 0 === c || /^sk_[a-z0-9]+$/i.test(c) || c == null ? d(g, null, 'Empty or invalid NetPay Private Key', !1) : !0; } function h() { return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'); } function t() { const c = new XMLHttpRequest(); c.overrideMimeType('application/json'); c.open('GET', 'https://docs.netpay.mx/lookup/ipaddress/', !1); c.onload = function () { a.requestData = JSON.parse(c.responseText); }; c.send(null); } function q(c, g, m, e, f) {
      const l = h(); a.ipAddress != '' ? m.ipAddress = a.ipAddress : (t(), m.ipAddress = a.requestData.ip); m.expYear.length >= 4 && (m.expYear = m.expYear.substring(2, 4)); const k = JSON.stringify(m); l.onreadystatechange = function (v) { this.readyState === 4 && (this.status === 200 || this.status === 201 ? d(e, null, { data: v.srcElement.responseType && v.srcElement.responseType !== 'text' ? v.srcElement.responseType === 'document' ? v.srcElement.responseXML : v.srcElement.response : v.srcElement.responseText, deviceFingerPrint: m.deviceFingerPrint }) : d(f, null, 'Se ha producido un error al generar el token de la tarjeta.', !1)); }; l.open(
        'POST',
        c,
        !1,
      ); l.setRequestHeader('Authorization', g); l.setRequestHeader('Content-Type', 'application/json'); l.send(k);
    } function r(c, g, m, e, f) {
      e = h(); e.onreadystatechange = function (k) { this.readyState === 4 && (a.requestData = this.status === 200 || this.status === 201 ? { result: 'success', errorCode: '000', data: JSON.parse(k.srcElement.responseType && k.srcElement.responseType !== 'text' ? k.srcElement.responseType === 'document' ? k.srcElement.responseXML : k.srcElement.response : k.srcElement.responseText) } : { result: 'error', errorCode: '002', errorMsg: 'Error al realizar la transacci\u00f3n.' }); };
      e.open('POST', c, !1); e.setRequestHeader('Authorization', g); e.setRequestHeader('Content-Type', 'application/json'); if (m != null) var l = JSON.stringify(m); e.send(l);
    } return a.version = 1, a.sandboxMode = !1, a.productionURL = 'https://suite.netpay.com.mx/gateway-ecommerce', a.sandboxURL = 'https://gateway-154.netpaydev.com/gateway-ecommerce', a.productionOrgId = '9ozphlqx', a.sandboxOrgId = '45ssiuz3', a.mid = 'netpaymx_retail', a.ipAddress = '', a.simpleUse = '', a.submitText = '', a.buttonDisabledStyle = '', a.buttonStyle = '', a.sandboxEmail = 'accept@netpay.com.mx', a.productionEmail = 'null@cybersource.com', a.createTokenURL = '/v3/token', a.chargeUrl = '/v3/charges', a.statusUrl = '/v1/transaction-report/transaction/', a.setSandboxMode = function (c) { a.sandboxMode = !!c; }, a.saveCard = function (c) { a.simpleUse = !c; }, a.getSaveCard = function () { return a.simpleUse; }, a.setIpAddress = function (c) { a.ipAddress = c; }, a.getSandboxMode = function () { return a.sandboxMode; }, a.setApiKey = function (c) { a.key = c; }, a.getApiKey = function () { return a.key; }, a.setPrivateKey = function (c) {
      a.privateKey = c;
    }, a.getPrivateKey = function () { return a.privateKey; }, a.setBillEmail = function (c) { a.billEmail = c; }, a.getBillEmail = function () { return a.billEmail; }, a.setFolio = function (c) { a.folio = c; }, a.getFolio = function () { return a.folio; }, a.setAmount = function (c) { a.amount = c; }, a.getAmount = function () { return a.amount; }, a.setProductName = function (c) { a.productName = c; }, a.getProductName = function () { return a.productName; }, a.setRedirect3dsUri = function (c) { a.redirect3dsUri = c; }, a.getRedirect3dsUri = function () { return a.redirect3dsUri; }, a.setTransactionToken = function (c) { a.transactionToken = c; }, a.getTransactionToken = function () { return a.transactionToken; }, a.confirm = function (c, g) {
      b(this.privateKey, g) && (a.transactionToken != '' && a.transactionToken != null ? (r(`${(a.sandboxMode ? a.sandboxURL : a.productionURL) + a.chargeUrl}/${a.transactionToken}/confirm`, a.privateKey, c, g), a.requestData.result == 'success' && a.requestData.data.status != null && a.requestData.data.status == 'success' ? d(c, null, { data: a.requestData }) : d(g, null, a.requestData.errorMsg, !1)) : d(
        g,
        null,
        'El valor del token de la transaccion est\u00e1 vacio.',
        !1,
      ));
    }, a.log = function (c) { typeof c === 'object' && 'toString' in c && (c = c.toString()); typeof console !== 'undefined' && 'log' in console && console.log(c); }, a.validate = function (c, g) { if (!c) throw `${g} required`; if (typeof c !== 'object') throw `${g} invalid`; }, a.formatData = function (c, g) { return c; }, a.send = function (c, g, m, e, f) {
      c = this.key; if (void 0 === c || /^pk_[a-z0-9]+$/i.test(c) || c == null ? d(e, null, 'Empty or invalid NetPay ID', !1) : 1) {
        if (a.card.validateNumber(g.cardNumber) || d(e, null, 'Empty or invalid card number', !1)) {
          if (a.card.validateExpiry(
            g.expMonth,
            g.expYear,
          ) || d(e, null, 'Empty or invalid expiry date', !1)) {
            if (a.card.validateCVV(g.cvv2, g.cardNumber) || d(e, null, 'Empty or invalid cvv', !1)) {
              if (/^[a-z0-9]+$/i.test(g.deviceFingerPrint) || d(e, null, 'Empty or invalid fingerprint', !1)) {
                if (c = a.sandboxMode ? a.sandboxURL : a.productionURL, f) {
                  b(this.privateKey, e) && (a.ipAddress != '' ? g.ipAddress = a.ipAddress : (t(), g.ipAddress = a.requestData.ip), g.expYear.length >= 4 && (a.card.expYear = g.expYear.substring(2, 4)), f = a.sandboxMode ? a.getBillEmail().length > 0 ? a.getBillEmail() : a.sandboxEmail
                    : a.productionEmail, r(c + a.createTokenURL, a.key, g, m, e), a.requestData.result == 'success' ? (r(c + a.chargeUrl, a.privateKey, {
                    description: a.productName,
                    source: a.requestData.data.token,
                    paymentMethod: 'card',
                    amount: a.amount,
                    currency: 'MXN',
                    billing: {
                      firstName: 'NoReal',
                      lastName: 'Name',
                      email: f,
                      phone: '650-965-6000',
                      address: {
                        city: 'Mountain View', country: 'US', postalCode: '94043', state: 'CA', street1: '1295 Charleston Road', street2: '',
                      },
                      merchantReferenceCode: a.folio,
                    },
                    redirect3dsUri: a.redirect3dsUri,
                  }, m, e), a.requestData.result == 'success'
                    ? a.requestData.data.status == 'review' ? window.location = a.requestData.data.returnUrl : a.requestData.data.status == 'failed' ? d(e, null, a.requestData.data.error, !1) : a.requestData.data.status == 'success' ? d(m, null, { data: a.requestData }) : d(e, null, a.requestData.data.error, !1) : d(e, null, a.requestData.errorMsg, !1)) : d(e, null, a.requestData.errorMsg, !1));
                } else return q(c + a.createTokenURL, a.key, g, m, e);
              }
            }
          }
        }
      }
    }, a;
  }.call(this); this.NetPay.card = function (a) {
    function d() { return d.__super__.constructor.apply(this, arguments); } return D(
      a,
      d,
    ), d.validateNumber = function (b) { return b = (`${b}`).replace(/\s+|-/g, ''), /^\d+$/.test(b) && b.length >= 10 && b.length <= 19 && d.validateLuhn(b) && d.validateNumberLength(b); }, d.validateLuhn = function (b) { for (var h = (`${b}`).split(''), t = parseInt(h[b.length - 1]), q = h.length - 2, r = 1; q >= 0; q--, r++)b = parseInt(h[q]), r % 2 != 0 && (b *= 2) > 9 && (b -= 9), t += b; return t % 10 == 0; }, d.validateCVV = function (b, h) {
      switch (arguments.length) {
        case 1: return b = p.tools.trim(b), /^\d+$/.test(b) && b.length >= 3 && b.length <= 4; case 2: return d.issuerName(h) == 'American Express'
          ? (b = p.tools.trim(b), /^\d+$/.test(b) && b.length == 4) : (b = p.tools.trim(b), /^\d+$/.test(b) && b.length == 3); default: return !1;
      }
    }, d.validateExpiry = function (b, h) { let t; let q; return (h = p.tools.trim(h)).length === 2 && (h = `20${h}`), b = p.tools.trim(b), !!/^\d+$/.test(b) && !!/^\d+$/.test(h) && parseInt(b, 10) <= 12 && parseInt(b, 10) >= 1 && (q = new Date(h, b), t = new Date(), q.setMonth(q.getMonth() - 1), q.setMonth(q.getMonth() + 1, 1), q > t); }, d.validateNumberLength = function (b) {
      let h; if (h = d.issuer(b)) {
        for (let t = h.length.length; t--;) if (h.length[t] == b.length) return !0;
        return !1;
      } return b.length >= 10 && b.length <= 19;
    }, d.issuerName = function (b) { let h; return b && (h = d.issuer(b)) ? h.name : ''; }, d.types = function () {
      return {
        visa_electron: {
          name: 'Visa Electron', regx: /^(4026|417500|4508|4844|491(3|7))/, length: [16], icon: 'https://i.ibb.co/WD28yGh/visa-electron-logo.png', accept: !0,
        },
        visa: {
          name: 'Visa', regx: /^4/, length: [16], icon: 'https://i.ibb.co/jbKNvPf/icons8-visa.png', accept: !0,
        },
        mastercard: {
          name: 'Mastercard',
          regx: /^5[1-5]/,
          length: [16],
          icon: 'https://i.ibb.co/HhLhx0N/master-card-logo.png',
          accept: !0,
        },
        mc: {
          name: 'Mastercard', regx: /^2[0-8]/, length: [16], icon: 'https://i.ibb.co/HhLhx0N/master-card-logo.png', accept: !0,
        },
        amex: {
          name: 'American Express', regx: /^3[47]/, length: [15], icon: 'https://i.ibb.co/4RDSYMc/amex-logo.png', accept: !0,
        },
      };
    }, d.issuer = function (b) { const h = d.types(); for (const t in h) { const q = h[t]; if (q, b.match(q.regx)) return q; } return !1; }, d;
  }.call(this, this.NetPay); this.NetPay.token = function (a) {
    function d() { return d.__super__.constructor.apply(this, arguments); } return D(a, d), d.create = function (
      b,
      h,
      t,
      q,
    ) { return p.validate(b, 'tarjeta'), p.formatData(b, d.whitelistedAttrs), p.send('tokens', b, h, t, q); }, d;
  }.call(this, this.NetPay); this.NetPay.tools = function (a) { function d() {} return D(a, d), d.trim = function (b) { return (`${b}`).replace(/^\s+|\s+$/g, ''); }, d; }.call(this, this.NetPay); this.NetPay.form = function (a) {
    function d() {} function b(e, f) {
      const l = document.createElement(e); f.style && (l.style = f.style); f.innerHTML && (l.innerHTML = f.innerHTML); f.placeholder && (l.placeholder = f.placeholder); f.maxLength && (l.maxLength = f.maxLength);
      f.type && (l.type = f.type); f.src && (l.src = f.src); f.width && (l.width = f.width); f.id && (l.id = f.id); return l;
    } function h(e, f, l) {
      let k = document.createElement('script'); k.src = `https://h.online-metrix.net/fp/tags.js?org_id=${e}&session_id=${l}`; k.type = 'text/javascript'; document.getElementsByTagName('head')[0].appendChild(k); k = document.createElement('iframe'); k.setAttribute('id', 'iframeTM'); k.style.width = '100px'; k.style.height = '100px'; k.style.border = '0'; k.style.position = 'absolute'; k.style.top = '-5000px'; k.src = `https://h.online-metrix.net/fp/tags?org_id=${
        e}&session_id=${f}${l}`; document.body.appendChild(k); return l;
    } function t() { const e = document.head || document.getElementsByTagName('head')[0]; const f = document.createElement('style'); e.appendChild(f); f.type = 'text/css'; f.styleSheet ? f.styleSheet.cssText = 'input:focus, textarea:focus, select:focus{ outline: none; }' : f.appendChild(document.createTextNode('input:focus, textarea:focus, select:focus{ outline: none; }')); } function q(e, f, l, k) { e.disabled = !f; e.style = f ? l : k; } let r; let c; let g; let m; return D(a, d), d.generate = function (
      e,
      f,
      l,
      k,
      v,
    ) {
      v = void 0 === v ? !1 : v; k = k || {}; p.submitText = k.submitText || 'Pagar'; let G; let w; let y; let z; let F; let A = !1; let B = !1; let C = !1; const E = document.getElementById(e); E.innerHTML = ''; const J = h(p.sandboxMode ? p.sandboxOrgId : p.productionOrgId, p.mid, (new Date()).getTime()); E.style = 'width: 300px; max-width: 100%; margin: 0 auto; font-family: Verdana,Geneva,sans-serif; padding: 20px; box-sizing: border-box; border: 1px solid #EDEDED;  border-radius: 7px;  background-color: #F5F7FA;  box-shadow: 0 5px 10px 0 rgba(194,194,194,0.5);'; E.appendChild(e = b(
        'form',
        {},
      )); e.remote = !0; t(); let x = b('div', { style: 'text-align: right' }); x.appendChild(b('img', { src: 'https://docs.netpay.mx/mails/assets/ic_secured.svg' })); x.appendChild(b('img', { src: 'https://docs.netpay.mx/mails/assets/pci.svg' })); const H = b('div', { style: 'text-align: left; margin-bottom: 14px;' }); H.appendChild(b('img', { src: 'https://docs.netpay.mx/cdn/assets/img/POS_logo.png', width: 70 })); e.appendChild(x); e.appendChild(H); e.appendChild(b('h1', {
        style: 'color: #435365; font-size: 15px;  font-weight: bold;  letter-spacing: 0;  line-height: 18px; margin-bottom: 20px;',
        innerHTML: k.title || 'Pago con Tarjeta',
      })); e.appendChild(b('label', { style: 'height: 18px; width: 6px; color: #FF6260; font-family: .SF NS Display; font-size: 14px; letter-spacing: 0; line-height: 18px;', innerHTML: '*' })); e.appendChild(b('label', { style: 'color: #435365; font-family: .SF NS Display; font-size: 13px; letter-spacing: 0; line-height: 18px; margin-top: 18px; margin-bottom: 5px;', innerHTML: 'N\u00famero tarjeta de d\u00e9bito/cr\u00e9dito:' })); x = b('div', { style: 'height: 0; overflow: visible; width: 0; position: relative; float: right; right: 40px; top: 28px;' });
      x.appendChild(G = b('img', { src: '', width: 30 })); e.appendChild(x); e.appendChild(c = b('input', {
        style: 'width: 100%; border: 1px solid #CECECE; border-radius: 3px; background-color: #FFFFFF; font-family: .SF NS Display; font-size: 14px; letter-spacing: 0; line-height: 17px; padding: 10px 10px 10px 9px; box-sizing : border-box; margin-bottom: 18px; margin-top: 5px;', type: 'text', placeholder: '0000-0000-0000-0000', maxLength: 19,
      })); e.appendChild(b('label', {
        style: 'height: 18px; width: 6px; color: #FF6260; font-family: .SF NS Display; font-size: 14px; letter-spacing: 0; line-height: 18px;',
        innerHTML: '*',
      })); e.appendChild(b('label', { style: 'color: #435365; font-family: .SF NS Display; font-size: 13px; letter-spacing: 0; line-height: 18px; margin-top: 18px; margin-bottom: 5px;', innerHTML: 'Fecha de vencimiento:' })); e.appendChild(g = b('input', {
        style: 'width: 100%; border: 1px solid #CECECE; border-radius: 3px; background-color: #FFFFFF; font-family: .SF NS Display; font-size: 14px; letter-spacing: 0; line-height: 17px; padding: 10px 10px 10px 9px; box-sizing : border-box; margin-bottom: 18px; margin-top: 5px;',
        type: 'text',
        placeholder: 'MM/AA',
        maxLength: 5,
      })); e.appendChild(b('label', { style: 'height: 18px; width: 6px; color: #FF6260; font-family: .SF NS Display; font-size: 14px; letter-spacing: 0; line-height: 18px;', innerHTML: '*' })); e.appendChild(b('label', { style: 'color: #435365; font-family: .SF NS Display; font-size: 13px; letter-spacing: 0; line-height: 18px; margin-top: 18px; margin-bottom: 5px;', innerHTML: 'C\u00f3digo de seguridad:' })); e.appendChild(m = b('input', {
        style: 'width: 100%; border: 1px solid #CECECE; border-radius: 3px; background-color: #FFFFFF; font-family: .SF NS Display; font-size: 14px; letter-spacing: 0; line-height: 17px; padding: 10px 10px 10px 9px; box-sizing : border-box; margin-bottom: 18px; margin-top: 5px;',
        type: 'password',
        placeholder: 'CVV',
        maxLength: 4,
      })); E.appendChild(r = b('button', { style: 'border-radius: 3px;  background-color: #435365;  box-shadow: 0 2px 5px 0 rgba(101,101,101,0.3); color: #FFFFFF; font size: 14px; font-weight: 600; letter-spacing: 0; line-height: 19px; text-align: center; margin-top: 20px; width: 100%; height: 40px; border: 1px; box-sizing : border-box; margin-bottom: 48px;', innerHTML: k.submitText || 'Pagar' })); r.onclick = function () {
        const n = {
          cardNumber: w,
          expMonth: y,
          expYear: z,
          cvv2: F,
          deviceFingerPrint: J,
          ipAddress: '',
          vault: 0,
        }; r.innerHTML = 'Procesando...'; r.disabled = !0; r.style = 'border-radius: 3px;  background-color: #435365;  box-shadow: 0 2px 5px 0 rgba(101,101,101,0.3); color: #FFFFFF; font size: 14px; font-weight: 600; letter-spacing: 0; line-height: 19px; text-align: center; margin-top: 20px; width: 100%; height: 40px; border: 1px; box-sizing : border-box; margin-bottom: 48px; opacity: 50%;'; c.disabled = !0; g.disabled = !0; m.disabled = !0; p.token.create(n, f, l, v);
      }; q(
        r,
        !1,
        'border-radius: 3px;  background-color: #435365;  box-shadow: 0 2px 5px 0 rgba(101,101,101,0.3); color: #FFFFFF; font size: 14px; font-weight: 600; letter-spacing: 0; line-height: 19px; text-align: center; margin-top: 20px; width: 100%; height: 40px; border: 1px; box-sizing : border-box; margin-bottom: 48px;',
        'border-radius: 3px;  background-color: #435365;  box-shadow: 0 2px 5px 0 rgba(101,101,101,0.3); color: #FFFFFF; font size: 14px; font-weight: 600; letter-spacing: 0; line-height: 19px; text-align: center; margin-top: 20px; width: 100%; height: 40px; border: 1px; box-sizing : border-box; margin-bottom: 48px; opacity: 50%;',
      ); c.addEventListener('input', (n) => {
        w = n.target.value.replace(/\D/g, ''); let u = w.match(/.{1,4}/g) || ['']; n.target.value = u.join('-'); u = p.card.issuer(n.target.value); p.card.validateNumber(w)
    || n.target.value == '' ? (n.target.style = 'width: 100%; border: 1px solid #CECECE; border-radius: 3px; background-color: #FFFFFF; font-family: .SF NS Display; font-size: 14px; letter-spacing: 0; line-height: 17px; padding: 10px 10px 10px 9px; box-sizing : border-box; margin-bottom: 18px; margin-top: 5px;', B = !0) : (n.target.style = 'width: 100%; border: solid 1px; border-radius: 3px; padding: 10px 10px 10px 9px; font-size: 15px; border-color: red; box-sizing : border-box; margin-bottom: 18px; margin-top: 5px;',
          B = !1); G.src = u ? u.icon : ''; q(r, B && A && C, 'border-radius: 3px;  background-color: #435365;  box-shadow: 0 2px 5px 0 rgba(101,101,101,0.3); color: #FFFFFF; font size: 14px; font-weight: 600; letter-spacing: 0; line-height: 19px; text-align: center; margin-top: 20px; width: 100%; height: 40px; border: 1px; box-sizing : border-box; margin-bottom: 48px;', 'border-radius: 3px;  background-color: #435365;  box-shadow: 0 2px 5px 0 rgba(101,101,101,0.3); color: #FFFFFF; font size: 14px; font-weight: 600; letter-spacing: 0; line-height: 19px; text-align: center; margin-top: 20px; width: 100%; height: 40px; border: 1px; box-sizing : border-box; margin-bottom: 48px; opacity: 50%;');
      });
      c.addEventListener('focus', (n) => { if (n.target.value.length > 1) { const u = w.match(/.{1,4}/g) || ['']; n.target.value = u.join('-'); } }); c.addEventListener('blur', (n) => { let u = n.target.value.replace(/\D/g, ''); p.maskCard = u.replace(/.(?=.{4})/g, '*'); u = p.maskCard.match(/.{1,4}/g) || ['']; n.target.value = u.join('-'); }); g.addEventListener('keyup', (n) => {
        const u = n.target.value.replace(/\D/g, '').match(/.{1,2}/g); u ? (n.target.value = u.join('/'), u.length == 2 ? (y = u[0], z = u[1], p.card.validateExpiry(y, z) ? (n.target.style = 'width: 100%; border: 1px solid #CECECE; border-radius: 3px; background-color: #FFFFFF; font-family: .SF NS Display; font-size: 14px; letter-spacing: 0; line-height: 17px; padding: 10px 10px 10px 9px; box-sizing : border-box; margin-bottom: 18px; margin-top: 5px;', A = !0) : (n.target.style = 'width: 100%; border: solid 1px; border-radius: 3px; padding: 10px 10px 10px 9px; font-size: 15px; border-color: red; box-sizing : border-box; margin-bottom: 18px; margin-top: 5px;', A = !1)) : z = y = null) : (n.target.style = 'width: 100%; border: 1px solid #CECECE; border-radius: 3px; background-color: #FFFFFF; font-family: .SF NS Display; font-size: 14px; letter-spacing: 0; line-height: 17px; padding: 10px 10px 10px 9px; box-sizing : border-box; margin-bottom: 18px; margin-top: 5px;', z = y = null); q(
          r,
          B && A && C,
          'border-radius: 3px;  background-color: #435365;  box-shadow: 0 2px 5px 0 rgba(101,101,101,0.3); color: #FFFFFF; font size: 14px; font-weight: 600; letter-spacing: 0; line-height: 19px; text-align: center; margin-top: 20px; width: 100%; height: 40px; border: 1px; box-sizing : border-box; margin-bottom: 48px;',
          'border-radius: 3px;  background-color: #435365;  box-shadow: 0 2px 5px 0 rgba(101,101,101,0.3); color: #FFFFFF; font size: 14px; font-weight: 600; letter-spacing: 0; line-height: 19px; text-align: center; margin-top: 20px; width: 100%; height: 40px; border: 1px; box-sizing : border-box; margin-bottom: 48px; opacity: 50%;',
        );
      }); m.addEventListener('keyup', (n) => {
        n.target.value.length > 1 && (F = n.target.value, p.card.validateCVV(F, w) ? (n.target.style = 'width: 100%; border: 1px solid #CECECE; border-radius: 3px; background-color: #FFFFFF; font-family: .SF NS Display; font-size: 14px; letter-spacing: 0; line-height: 17px; padding: 10px 10px 10px 9px; box-sizing : border-box; margin-bottom: 18px; margin-top: 5px;',
        C = !0) : (n.target.style = 'width: 100%; border: solid 1px; border-radius: 3px; padding: 10px 10px 10px 9px; font-size: 15px; border-color: red; box-sizing : border-box; margin-bottom: 18px; margin-top: 5px;', C = !1)); q(
          r,
          B && A && C,
          'border-radius: 3px;  background-color: #435365;  box-shadow: 0 2px 5px 0 rgba(101,101,101,0.3); color: #FFFFFF; font size: 14px; font-weight: 600; letter-spacing: 0; line-height: 19px; text-align: center; margin-top: 20px; width: 100%; height: 40px; border: 1px; box-sizing : border-box; margin-bottom: 48px;',
          'border-radius: 3px;  background-color: #435365;  box-shadow: 0 2px 5px 0 rgba(101,101,101,0.3); color: #FFFFFF; font size: 14px; font-weight: 600; letter-spacing: 0; line-height: 19px; text-align: center; margin-top: 20px; width: 100%; height: 40px; border: 1px; box-sizing : border-box; margin-bottom: 48px; opacity: 50%;',
        );
      });
    }, d.reset = function () {
      r.innerHTML = p.submitText; r.disabled = !1; r.style = 'border-radius: 3px;  background-color: #435365;  box-shadow: 0 2px 5px 0 rgba(101,101,101,0.3); color: #FFFFFF; font size: 14px; font-weight: 600; letter-spacing: 0; line-height: 19px; text-align: center; margin-top: 20px; width: 100%; height: 40px; border: 1px; box-sizing : border-box; margin-bottom: 48px;';
      c.disabled = !1; g.disabled = !1; m.disabled = !1;
    }, d;
  }.call(this, this.NetPay); typeof module === 'object' && typeof exports !== 'undefined' && (module.exports = this.NetPay);
}).call(this);
