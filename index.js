// Import stylesheets
// import "./style.css";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var dictionaryURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
var form = document.querySelector("#defineform");
var wordheader = document.getElementById('word');
var speech = document.getElementById('speech');
var definitionText = document.getElementById("definitionText");
form.onsubmit = function () {
    var formData = new FormData(form);
    var word = formData.get("defineword");
    console.log(word);
    definitionText.innerHTML = "";
    fetchDefinition(word).then(function (response) {
        wordheader.innerHTML = response[0].word;
        speech.innerHTML = response[0].meanings[0].partOfSpeech;
        var index = 0;
        response[0].meanings.forEach(function (def) {
            console.log(def.definitions[index]);
            definitionText.innerHTML += "<p>".concat(def.definitions[index].definition, "</p>");
            for (var i = 0; i < def.definitions[index].synonyms.length; i++) {
                definitionText.innerHTML += "<p>".concat(def.definitions[index].synonyms[i], "</p>");
            }
            for (var i = 0; i < def.definitions[index].antonyms.length; i++) {
                definitionText.innerHTML += "<p>".concat(def.definitions[index].antonyms[i], "</p>");
            }
        });
    });
    return false; // prevent reload
};
function fetchDefinition(word) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch(dictionaryURL + word, {
                            method: "GET"
                        })
                            .then(function (response) {
                            return response.json();
                        })
                            .then(function (data) {
                            return data;
                        })];
                case 1:
                    response = _a.sent();
                    console.log(response);
                    return [2 /*return*/, response];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
