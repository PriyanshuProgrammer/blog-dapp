/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/basic.json`.
 */
export type Basic = {
  "address": "JAVuBXeBZqXNtS73azhBDAoYaaAFfo4gWXoZe2e7Jf8H",
  "metadata": {
    "name": "basic",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addComment",
      "discriminator": [
        59,
        175,
        193,
        236,
        134,
        214,
        75,
        141
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "blog"
        },
        {
          "name": "comment",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  109,
                  109,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "blog.comment_counter",
                "account": "blog"
              },
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "account",
                "path": "blog"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "comment",
          "type": "string"
        }
      ]
    },
    {
      "name": "dislikeTweet",
      "discriminator": [
        40,
        221,
        179,
        49,
        162,
        224,
        64,
        97
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "blog",
          "writable": true
        },
        {
          "name": "reaction",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  97,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "blog"
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initializeBlog",
      "discriminator": [
        195,
        223,
        187,
        134,
        244,
        232,
        54,
        32
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "blog",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  108,
                  111,
                  103
                ]
              },
              {
                "kind": "arg",
                "path": "serialNumber"
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "serialNumber",
          "type": "string"
        },
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "content",
          "type": "string"
        }
      ]
    },
    {
      "name": "likeTweet",
      "discriminator": [
        248,
        27,
        137,
        254,
        228,
        130,
        141,
        149
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "blog",
          "writable": true
        },
        {
          "name": "reaction",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  97,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "blog"
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "removeComment",
      "discriminator": [
        163,
        33,
        247,
        159,
        142,
        140,
        137,
        109
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "blog"
        },
        {
          "name": "comment",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  109,
                  109,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "serialNumber"
              },
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "account",
                "path": "blog"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "serialNumber",
          "type": "i32"
        }
      ]
    },
    {
      "name": "removeReaction",
      "discriminator": [
        104,
        53,
        215,
        88,
        121,
        195,
        74,
        50
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "blog",
          "writable": true
        },
        {
          "name": "reaction",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  97,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "blog"
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "blog",
      "discriminator": [
        152,
        205,
        212,
        154,
        186,
        203,
        207,
        244
      ]
    },
    {
      "name": "comment",
      "discriminator": [
        150,
        135,
        96,
        244,
        55,
        199,
        50,
        65
      ]
    },
    {
      "name": "reaction",
      "discriminator": [
        226,
        61,
        100,
        191,
        223,
        221,
        142,
        139
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "reactionReinitialize",
      "msg": "The reaction is already initialized"
    }
  ],
  "types": [
    {
      "name": "blog",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "blogAuthor",
            "type": "pubkey"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "likes",
            "type": "i32"
          },
          {
            "name": "dislikes",
            "type": "i32"
          },
          {
            "name": "commentCounter",
            "type": "i32"
          }
        ]
      }
    },
    {
      "name": "comment",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "blog",
            "type": "pubkey"
          },
          {
            "name": "commentAuthor",
            "type": "pubkey"
          },
          {
            "name": "comment",
            "type": "string"
          },
          {
            "name": "index",
            "type": "i32"
          }
        ]
      }
    },
    {
      "name": "reaction",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "blog",
            "type": "pubkey"
          },
          {
            "name": "reactionAuthor",
            "type": "pubkey"
          },
          {
            "name": "reaction",
            "type": {
              "defined": {
                "name": "reactionType"
              }
            }
          }
        ]
      }
    },
    {
      "name": "reactionType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "like"
          },
          {
            "name": "dislike"
          }
        ]
      }
    }
  ]
};
