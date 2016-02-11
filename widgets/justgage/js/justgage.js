/*
    ioBroker.vis justgage Widget-Set

    version: "0.0.1"

    Copyright 10.2015-2016 Pmant<patrickmo@gmx.de>

*/
"use strict";

// add translations for edit mode
if (vis.editMode) {
    $.extend(true, systemDictionary, {
        /**
         * tplJustgageValueColored
         */
        "color1":           {"en": "color 1",                   "de": "Farbe 1",                    "ru": "color 1"},
        "color2":           {"en": "color 2",                   "de": "Farbe 2",                    "ru": "color 2"},
        "color3":           {"en": "color 3",                   "de": "Farbe 3",                    "ru": "color 3"},
        "pow1":             {"en": "weighting color 1",            "de": "Wichtung Farbe 1",        "ru": "weighting color 1"},
        "pow2":             {"en": "weighting color 2",            "de": "Wichtung Farbe 2",        "ru": "weighting color 2"},
        "pow3":             {"en": "weighting color 3",            "de": "Wichtung Farbe 3",        "ru": "weighting color 3"},
        "min":              {"en": "min",                       "de": "min",                        "ru": "min"},
        "mid":              {"en": "mid",                       "de": "mid",                        "ru": "mid"},
        "max":              {"en": "max",                       "de": "max",                        "ru": "max"},
        "digits":           {"en": "Digits after comma",        "de": "Zeichen nach Komma",         "ru": "Знаков после запятой"},
        "is_comma":         {"en": "Divider comma",             "de": "Komma als Trennung",         "ru": "Запятая-разделитель"},
        "html_prepend":     {"en": "Prepend value",             "de": "Voranstellen HTML",          "ru": "Префикс значения"},
        "html_append_singular": {
            "en" : "Append to value (Singular)",
            "de": "HTML anhängen (Singular)",
            "ru": "Суффикс значения(един.ч.)"
        },
        "html_append_plural": {
            "en" : "Append to value (Plural)",
            "de": "HTML anhängen(Plural)",
            "ru": "Суффикс значения(множ.ч.)"
        },
        "group_html":       {"en": "html",                      "de": "Html",                       "ru": "html"},
        "group_color":      {"en": "color",                     "de": "Farbe",                      "ru": "color"},

        /**
         * tplJustgageJustGage
         */
        "min_oid":          {"en": "min",                       "de": "min",                        "ru": "min"},
        "mid_oid":          {"en": "mid",                       "de": "mid",                        "ru": "mid"},
        "max_oid":          {"en": "max",                       "de": "max",                        "ru": "max"},
        "group_value":      {"en": "value",                     "de": "Wert",                       "ru": "value"},
        "hideValue":        {"en": "hide value",                "de": "verstecke Wert",             "ru": "hide value"},
        "unit":             {"en": "unit",                      "de": "Einheit",                    "ru": "unit"},
        "valueFontColor":   {"en": "color",                     "de": "Farbe",                      "ru": "color"},
        "valueFontFamily":  {"en": "font-family",               "de": "Schriftfamilie",             "ru": "font-family"},
        "valueOffsetY":     {"en": "Offset Y",                  "de": "Versatz Y",                  "ru": "Offset Y"},
        "group_title1":     {"en": "title",                     "de": "Titel",                      "ru": "title"},
        "titleFontColor":   {"en": "color",                     "de": "Farbe",                      "ru": "color"},
        "titleFontFamily":  {"en": "font-family",               "de": "Schriftfamilie",             "ru": "font-family"},
        "titleBelow":       {"en": "title below",               "de": "Titel unten",                "ru": "title below"},
        "titleOffsetY":     {"en": "Offset Y",                  "de": "Versatz Y",                  "ru": "Offset Y"},
        "group_label":      {"en": "label",                     "de": "Beschriftung",               "ru": "label"},
        "label_oid":            {"en": "label",                     "de": "Beschriftung",               "ru": "label"},
        "labelFontColor":   {"en": "color",                     "de": "Farbe",                      "ru": "color"},
        "labelFontFamily":  {"en": "font-family",               "de": "Schriftfamilie",             "ru": "font-family"},
        "labelOffsetY":     {"en": "Offset Y",                  "de": "Versatz Y",                  "ru": "Offset Y"},
        "group_pointer":    {"en": "pointer",                   "de": "Zeiger",                     "ru": "pointer"},
        "pointer":          {"en": "show pointer",              "de": "zeige Zeiger",               "ru": "show pointer"},
        "pointerMid":       {"en": "show mid",                  "de": "zeige Mitte",                "ru": "show mid"},
        "pointerColor":     {"en": "color",                     "de": "Farbe",                      "ru": "color"},
        "pointerOptions":   {"en": "pointerOptions",            "de": "pointerOptions",             "ru": "pointerOptions"},
        "hideInnerShadow":  {"en": "hide shadow",               "de": "verstecke Schatten",         "ru": "hide shadow"},
        "shadowOpacity":    {"en": "shadowOpacity",             "de": "shadowOpacity",              "ru": "shadowOpacity"},
        "shadowSize":       {"en": "shadowSize",                "de": "shadowSize",                 "ru": "shadowSize"},
        "shadowVerticalOffset": {"en": "shadowVerticalOffset",  "de": "shadowVerticalOffset",       "ru": "shadowVerticalOffset"},
        "group_layout":     {"en": "layout",                    "de": "Layout",                     "ru": "layout"},
        "hideMinMax":       {"en": "hide min/max",              "de": "verstecke min/max",          "ru": "hide min/max"},
        "donut":            {"en": "donut",                     "de": "donut",                      "ru": "donut"},
        "donutStartAngle":  {"en": "donut start angle",         "de": "donut Startwinkel",          "ru": "donut start angle"},
        "gaugeColor":       {"en": "background color",          "de": "Hintergrundfarbe",           "ru": "background color"},
        "gaugeWidthScale":  {"en": "gauge width %",             "de": "Gauge Breite %",             "ru": "gauge width %"},

        /**
         * tplJustgageIndicatorColored
         */
        "equalAfter":       {"en": "equal after",               "de": "gleichbleibend nach",        "ru": "equal after"},
        "up":               {"en": "up",                        "de": "hoch",                       "ru": "up"},
        "equal":            {"en": "equal",                     "de": "gleich",                     "ru": "equal"},
        "down":             {"en": "down",                      "de": "runter",                     "ru": "down"},



    });
}

// add translations for non-edit mode
$.extend(true, systemDictionary, {
    "Instance":  {"en": "Instance", "de": "Instanz", "ru": "Инстанция"}
});

// this code can be placed directly in justgage.html
vis.binds.justgage = {
    version: "0.0.1",
    showVersion: function () {
        if (vis.binds.justgage.version) {
            console.log('Version justgage: ' + vis.binds.justgage.version);
            vis.binds.justgage.version = null;
        }
    },
    createValueColored: function (widgetID, view, data, style) {
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds.justgage.createValueColored(widgetID, view, data, style);
            }, 100);
        }

        function textRenderer(value){
            var val = parseFloat(value);
            if (data.digits !== undefined && data.digits != '') val = val.toFixed(parseFloat(data.digits, 10));
            if (data.attr('is_comma')) {
                val = '' + val;
                val = val.replace('.', ',');
            }
            val += data.unit || "";
            return val;
        };

        var val = parseFloat(vis.states[data.oid + '.val'] || data.oid) || 0;
        var min = parseFloat(vis.states[data.min_oid + '.val'] || data.min_oid) || 0;
        var max = parseFloat(vis.states[data.max_oid + '.val'] || data.max_oid) || 100;
        var mid = Math.min(max,Math.max(min,parseFloat(parseFloat(vis.states[data.mid_oid + '.val'] || data.mid_oid) || 50) || 50));
        var colors = [
            {
                pct: 0,
                color: data.color1 || "#0000aa",
                pow: data.pow1 || 1
            },
            {
                pct: (mid-min) / (max - min),
                color: data.color2 || "#00aa00",
                pow: data.pow2 || 1,
            },
            {
                pct: 1.0,
                color: data.color3 || "#aa0000",
                pow: data.pow3 || 1,
            },
        ];

        var color = getColorGrad(pctInterval(min,max,val), colors);
        var text = '<div class="justgage-valueColored" data-oid="'+data.oid+'" style="color:'+color+'">';
        text += data.html_prepend || "";
        text += '<span>' + textRenderer(val) + '</span>';
        text += parseFloat(textRenderer(val)) == 1 ? data.html_append_singular || "" : data.html_append_plural || "";
        text += '</div>';

        $div.html(text);


        // subscribe on updates of value
        if (vis.states[data.oid + '.val']) {
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                val = parseFloat(newVal);
                var text = data.html_prepend || "";
                text += '<span>' + textRenderer(val) + '</span>';
                text += parseFloat(textRenderer(val)) == 1 ? data.html_append_singular || "" : data.html_append_plural || "";
                var color = getColorGrad(pctInterval(min,max,val), colors);
                $('#'+widgetID+' .justgage-valueColored').html(text).animate({color: color},700);
            });
        }
        // subscribe on updates of mid
        if (isNaN(parseFloat(data.mid_oid))) {
            vis.states.bind(data.mid_oid + '.val', function (e, newVal, oldVal) {
                mid = parseFloat(newVal);
                colors[1].pct = (mid-min) / (max - min);
                var color = getColorGrad(pctInterval(min,max,val), colors);
                $('#'+widgetID+' .justgage-valueColored').animate({color: color},700);
            });
        }

        // subscribe on updates of min
        if (isNaN(parseFloat(data.min_oid))) {
            vis.states.bind(data.min_oid + '.val', function (e, newVal, oldVal) {
                min = parseFloat(newVal);
                colors[1].pct = (mid-min) / (max - min);
                var color = getColorGrad(pctInterval(min,max,val), colors);
                $('#'+widgetID+' .justgage-valueColored').animate({color: color},700);
            });
        }

        // subscribe on updates of max
        if (isNaN(parseFloat(data.max_oid))) {
            vis.states.bind(data.max_oid + '.val', function (e, newVal, oldVal) {
                max = parseFloat(newVal);
                colors[1].pct = (mid-min) / (max - min);
                var color = getColorGrad(pctInterval(min,max,val), colors);
                $('#'+widgetID+' .justgage-valueColored').animate({color: color},700);
            });
        }
    },
    createIndicatorColored: function (widgetID, view, data, style) {
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds.justgage.createIndicatorColored(widgetID, view, data, style);
            }, 100);
        }

        var val = parseFloat(vis.states[data.oid + '.val'] || data.oid) || 0;
        var min = parseFloat(vis.states[data.min_oid + '.val'] || data.min_oid) || 0;
        var max = parseFloat(vis.states[data.max_oid + '.val'] || data.max_oid) || 100;
        var mid = Math.min(max,Math.max(min,parseFloat(parseFloat(vis.states[data.mid_oid + '.val'] || data.mid_oid) || 50) || 50));
        var colors = [
            {
                pct: 0,
                color: data.color1 || "#0000aa",
                pow: data.pow1 || 1
            },
            {
                pct: (mid-min) / (max - min),
                color: data.color2 || "#00aa00",
                pow: data.pow2 || 1,
            },
            {
                pct: 1.0,
                color: data.color3 || "#aa0000",
                pow: data.pow3 || 1,
            },
        ];

        var color = getColorGrad(pctInterval(min,max,val), colors);
        var text = '<div class="justgage-indicatorColored" data-oid="'+data.oid+'" style="color:'+color+'">';
        text += data.equal || "→";
        text += '</div>';

        $div.html(text);
        var ts = Date.now();
        var eqA = parseFloat(data.equalAfter || 0)*1000;

        // subscribe on updates of value
        if (vis.states[data.oid + '.val']) {
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                val = parseFloat(newVal);
                if (val>oldVal){
                    text = data.up || "↑";
                }else if (oldVal>newVal){
                    text = data.down || "↓";
                }else if (Date.now() - ts > eqA){
                    text = data.equal || "→";
                }
                var color = getColorGrad(pctInterval(min,max,val), colors);
                $('#'+widgetID+' .justgage-indicatorColored').html(text).animate({color: color},700);
            });
        }
        // subscribe on updates of mid
        if (isNaN(parseFloat(data.mid_oid))) {
            vis.states.bind(data.mid_oid + '.val', function (e, newVal, oldVal) {
                mid = parseFloat(newVal);
                colors[1].pct = (mid-min) / (max - min);
                var color = getColorGrad(pctInterval(min,max,val), colors);
                $('#'+widgetID+' .justgage-indicatorColored').animate({color: color},700);
            });
        }

        // subscribe on updates of min
        if (isNaN(parseFloat(data.min_oid))) {
            vis.states.bind(data.min_oid + '.val', function (e, newVal, oldVal) {
                min = parseFloat(newVal);
                colors[1].pct = (mid-min) / (max - min);
                var color = getColorGrad(pctInterval(min,max,val), colors);
                $('#'+widgetID+' .justgage-indicatorColored').animate({color: color},700);
            });
        }

        // subscribe on updates of max
        if (isNaN(parseFloat(data.max_oid))) {
            vis.states.bind(data.max_oid + '.val', function (e, newVal, oldVal) {
                max = parseFloat(newVal);
                colors[1].pct = (mid-min) / (max - min);
                var color = getColorGrad(pctInterval(min,max,val), colors);
                $('#'+widgetID+' .justgage-indicatorColored').animate({color: color},700);
            });
        }
    },
    createJustGage: function (widgetID, view, data, style) {
        var $div = $('#' + widgetID);
        // if nothing found => wait
        if (!$div.length) {
            return setTimeout(function () {
                vis.binds.justgage.createJustGage(widgetID, view, data, style);
            }, 100);
        }

        var pointerOptions;
        try{
            pointerOptions =  JSON.parse(data.pointerOptions);
        } catch(e) {
            pointerOptions = {
                toplength: -15,
                bottomlength: 10,
                bottomwidth: 12,
                color: data.pointerColor || '#8e8e93',
                stroke: data.gaugeColor || '#edebeb',
                stroke_width: 3,
                stroke_linecap: 'round'
            };
        }

        var min = parseFloat(vis.states[data.min_oid + '.val'] || data.min_oid) || 0;
        var max = Math.max(min+1,parseFloat(vis.states[data.max_oid + '.val'] || data.max_oid) || 100);
        var mid = Math.min(max,Math.max(min,parseFloat(parseFloat(vis.states[data.mid_oid + '.val'] || data.mid_oid) || 50) || 50));
        var g = new JustGage({
            id: widgetID,
            value: parseFloat(vis.states[data.oid + '.val'] || 0),
            textRenderer: function(value){
                var val = parseFloat(value);
                if (data.digits !== undefined && data.digits != '') val = val.toFixed(parseFloat(data.digits, 10));
                if (data.attr('is_comma')) {
                    val = '' + val;
                    val = val.replace('.', ',');
                }
                val += data.unit || "";
                return val;
            },
            min: min,
            max: max,
            mid: mid,

            hideValue: data.hideValue || false,
            valueFontColor: data.valueFontColor || "#010101",
            valueFontFamily: data.valueFontFamily || "Arial",
            valueMinFontSize: 10,
            valueOffsetY: data.valueOffsetY || 0,

            title: data.title || "",
            titleFontColor: data.titleFontColor || '#999999',
            titleFontFamily: data.titleFontFamily || "sans-serif",
            titlePosition: data.titleBelow ? "below" : "above",
            titleOffsetY: data.titleOffsetY || 0,

            label: vis.states[data.label_oid + '.val'] || data.label_oid || "",
            labelFontColor: data.labelFontColor || '#b3b3b3',
            labelFontFamily: data.labelFontFamily || "Arial",
            labelOffsetY: data.labelOffsetY || 0,

            hideMinMax: data.hideMinMax || false,
            donut: data.donut || false,
            pointer: data.pointer || false,
            pointerMid: data.pointerMid || false,
            pointerOptions: pointerOptions,

            startAnimationTime: 0,
            refreshAnimationTime: 700,
            counter: false,

            gaugeColor: data.gaugeColor || "#ebebeb",
            levelColors: [
                {
                    pct: 0,
                    color: data.color1 || "#0000aa",
                    pow: data.pow1 || 1
                },
                {
                    pct: (mid-min) / (max-min),
                    color: data.color2 || "#00aa00",
                    pow: data.pow2 || 1,
                },
                {
                    pct: 1.0,
                    color: data.color3 || "#aa0000",
                    pow: data.pow3 || 1,
                },
            ],
            gaugeWidthScale: data.gaugeWidthScale ? data.gaugeWidthScale/100 : 1.0,
            donutStartAngle: data.donutStartAngle || 90,

            shadowOpacity: parseFloat(data.shadowOpacity) || 0.2,
            shadowSize: parseInt(data.shadowSize) || 5,
            shadowVerticalOffset: parseInt(data.shadowVerticalOffset) || 3,
            hideInnerShadow: data.hideInnerShadow || false,
        });

        // subscribe on updates of value
        if (vis.states[data.oid + '.val']) {
            vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                g.refresh(newVal);
            });
        }
        // subscribe on updates of mid
        if (isNaN(parseFloat(data.mid_oid))) {
            vis.states.bind(data.mid_oid + '.val', function (e, newVal, oldVal) {
                g.config.mid = Math.min(g.config.max,Math.max(g.config.min,newVal));
                g.config.levelColors[1].pct = (g.config.mid-g.config.min) / (g.config.max-g.config.min);
                g.refresh(g.config.value);
            });
        }
        // subscribe on updates of label
        if (isNaN(parseFloat(data.label_oid))) {
            vis.states.bind(data.label_oid + '.val', function (e, newVal, oldVal) {
                g.config.label = newVal;
                g.refresh(g.config.value);
            });
        }
        // subscribe on updates of min
        if (isNaN(parseFloat(data.min_oid))) {
            vis.states.bind(data.min_oid + '.val', function (e, newVal, oldVal) {
                g.config.min = Math.min(g.config.max-1,newVal);
                g.config.mid = Math.min(g.config.max,Math.max(g.config.min,g.config.mid));
                g.config.levelColors[1].pct = (g.config.mid-g.config.min) / (g.config.max-g.config.min);
                g.refresh(g.config.value);
            });
        }
        // subscribe on updates of max
        if (isNaN(parseFloat(data.max_oid))) {
            vis.states.bind(data.max_oid + '.val', function (e, newVal, oldVal) {
                g.config.max = Math.max(g.config.min+1,newVal);
                g.config.mid = Math.min(g.config.max,Math.max(g.config.min,g.config.mid));
                g.config.levelColors[1].pct = (g.config.mid-g.config.min) / (g.config.max-g.config.min);
                g.refresh(g.config.value);
            });
        }
    },
};

vis.binds.justgage.showVersion();

/** Get color for value */
function getColorGrad(pct, col) {
    var no, inc, colors, percentage, rval, gval, bval, lower, upper, range, rangePct, pctLower, pctUpper, color, pow;

    no = col.length;
    if (no === 1) return col[0];
    inc = 1 / (no - 1);
    colors = [];
    for (var i = 0; i < col.length; i++) {
        if (typeof col[i] === 'object'){
            percentage = col[i].pct ? col[i].pct : inc * i;
            pow = col[i].pow || 1;
            rval = parseInt((cutHex(col[i].color)).substring(0, 2), 16);
            gval = parseInt((cutHex(col[i].color)).substring(2, 4), 16);
            bval = parseInt((cutHex(col[i].color)).substring(4, 6), 16);
        }else{
            percentage =inc * i;
            pow = 1;
            rval = parseInt((cutHex(col[i])).substring(0, 2), 16);
            gval = parseInt((cutHex(col[i])).substring(2, 4), 16);
            bval = parseInt((cutHex(col[i])).substring(4, 6), 16);
        }
        colors[i] = {
            pct: percentage,
            pow: pow,
            color: {
                r: rval,
                g: gval,
                b: bval
            }
        };
    }

    if (pct === 0) {
        return 'rgb(' + [colors[0].color.r, colors[0].color.g, colors[0].color.b].join(',') + ')';
    }

    for (var j = 0; j < colors.length; j++) {
        if (pct <= colors[j].pct) {
            lower = colors[j - 1];
            upper = colors[j];
            range = upper.pct - lower.pct;
            rangePct = Math.pow((pct - lower.pct) / range,colors[j].pow/colors[j-1].pow);
            pctLower = 1 - rangePct;
            pctUpper = rangePct;
            color = {
                r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
                g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
                b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
            };
            return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
        }
    }

}
function cutHex(str) {
    return (str.charAt(0) == "#") ? str.substring(1, 7) : str;
}

//Helper Functions
function clamp( x, min, max ) {
    if(x<min){ return min; }
    if(x>max){ return max; }
    return x;
}

function pctInterval(min,max,val){
    var valClamp = clamp(val,min,max);
    return (valClamp-min) / (max-min);
}