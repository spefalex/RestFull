module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "node": true,
        "es6" : true
    },
    "globals": {    
    "module": 1,
    "twilio":1,
    "Institutions":1,
  },
    "extends": "eslint:recommended",
   
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": 0,
        "semi": [
            "error",
            "always"
        ], 
        "strict"                           : 0,
        "no-underscore-dangle"             : 0,
        "no-multi-spaces"                  : 0,
        "no-shadow"                        : 0,
        "consistent-return"                : 2,
        "no-use-before-define"             : 2,
        "new-parens"                       : 2,
        "no-cond-assign"                   : 2,
        "keyword-spacing"                  : 2,
        "space-infix-ops"                  : 2,
        "key-spacing"                      : [2, {"align": "colon"}],
        "comma-dangle"                     : [2, "never"],
        "no-multiple-empty-lines"          : [2, {"max": 2}],
        "eqeqeq"                           : [2, "smart"],
        "wrap-iife"                        : [2, "inside"],
        "indent"                           : [2, 2],
        "brace-style"                      : [2, "1tbs"],
        "spaced-comment"                   : [2, "always", {"exceptions":["-","+"]}],
        "space-before-function-parentheses": [2, {
                                                "anonymous" : "always",
                                                "named" : "never"
    }]
    }
};