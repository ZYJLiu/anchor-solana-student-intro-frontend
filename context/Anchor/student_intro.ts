export type StudentIntro = {
  version: "0.1.0"
  name: "student_intro"
  instructions: [
    {
      name: "addStudentIntro"
      accounts: [
        {
          name: "studentIntro"
          isMut: true
          isSigner: false
          pda: {
            seeds: [
              {
                kind: "account"
                type: "publicKey"
                path: "student"
              }
            ]
          }
        },
        {
          name: "replyCounter"
          isMut: true
          isSigner: false
          pda: {
            seeds: [
              {
                kind: "const"
                type: "string"
                value: "counter"
              },
              {
                kind: "account"
                type: "publicKey"
                account: "StudentInfo"
                path: "student_intro"
              }
            ]
          }
        },
        {
          name: "rewardMint"
          isMut: true
          isSigner: false
          pda: {
            seeds: [
              {
                kind: "const"
                type: "string"
                value: "mint"
              }
            ]
          }
        },
        {
          name: "tokenAccount"
          isMut: true
          isSigner: false
        },
        {
          name: "student"
          isMut: true
          isSigner: true
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "rent"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "name"
          type: "string"
        },
        {
          name: "message"
          type: "string"
        }
      ]
    },
    {
      name: "addReply"
      accounts: [
        {
          name: "replyAccount"
          isMut: true
          isSigner: false
          pda: {
            seeds: [
              {
                kind: "account"
                type: "publicKey"
                account: "StudentInfo"
                path: "student_intro"
              },
              {
                kind: "account"
                type: "u64"
                account: "ReplyCounter"
                path: "reply_counter.counter"
              }
            ]
          }
        },
        {
          name: "studentIntro"
          isMut: false
          isSigner: false
        },
        {
          name: "replyCounter"
          isMut: true
          isSigner: false
          pda: {
            seeds: [
              {
                kind: "const"
                type: "string"
                value: "counter"
              },
              {
                kind: "account"
                type: "publicKey"
                account: "StudentInfo"
                path: "student_intro"
              }
            ]
          }
        },
        {
          name: "rewardMint"
          isMut: true
          isSigner: false
          pda: {
            seeds: [
              {
                kind: "const"
                type: "string"
                value: "mint"
              }
            ]
          }
        },
        {
          name: "tokenAccount"
          isMut: true
          isSigner: false
        },
        {
          name: "student"
          isMut: true
          isSigner: true
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "rent"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "reply"
          type: "string"
        }
      ]
    },
    {
      name: "updateStudentIntro"
      accounts: [
        {
          name: "studentIntro"
          isMut: true
          isSigner: false
          pda: {
            seeds: [
              {
                kind: "account"
                type: "publicKey"
                path: "student"
              }
            ]
          }
        },
        {
          name: "student"
          isMut: true
          isSigner: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "name"
          type: "string"
        },
        {
          name: "message"
          type: "string"
        }
      ]
    },
    {
      name: "close"
      accounts: [
        {
          name: "studentIntro"
          isMut: true
          isSigner: false
          pda: {
            seeds: [
              {
                kind: "account"
                type: "publicKey"
                path: "student"
              }
            ]
          }
        },
        {
          name: "student"
          isMut: true
          isSigner: true
        }
      ]
      args: []
    },
    {
      name: "createRewardMint"
      accounts: [
        {
          name: "rewardMint"
          isMut: true
          isSigner: false
          pda: {
            seeds: [
              {
                kind: "const"
                type: "string"
                value: "mint"
              }
            ]
          }
        },
        {
          name: "user"
          isMut: true
          isSigner: true
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "rent"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "metadata"
          isMut: true
          isSigner: false
        },
        {
          name: "tokenMetadataProgram"
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: "uri"
          type: "string"
        },
        {
          name: "name"
          type: "string"
        },
        {
          name: "symbol"
          type: "string"
        }
      ]
    }
  ]
  accounts: [
    {
      name: "studentInfo"
      type: {
        kind: "struct"
        fields: [
          {
            name: "student"
            type: "publicKey"
          },
          {
            name: "name"
            type: "string"
          },
          {
            name: "message"
            type: "string"
          }
        ]
      }
    },
    {
      name: "replyCounter"
      type: {
        kind: "struct"
        fields: [
          {
            name: "counter"
            type: "u64"
          }
        ]
      }
    },
    {
      name: "reply"
      type: {
        kind: "struct"
        fields: [
          {
            name: "studentinfo"
            type: "publicKey"
          },
          {
            name: "reply"
            type: "string"
          }
        ]
      }
    }
  ]
}

export const IDL: StudentIntro = {
  version: "0.1.0",
  name: "student_intro",
  instructions: [
    {
      name: "addStudentIntro",
      accounts: [
        {
          name: "studentIntro",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "account",
                type: "publicKey",
                path: "student",
              },
            ],
          },
        },
        {
          name: "replyCounter",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "counter",
              },
              {
                kind: "account",
                type: "publicKey",
                account: "StudentInfo",
                path: "student_intro",
              },
            ],
          },
        },
        {
          name: "rewardMint",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "mint",
              },
            ],
          },
        },
        {
          name: "tokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "student",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "message",
          type: "string",
        },
      ],
    },
    {
      name: "addReply",
      accounts: [
        {
          name: "replyAccount",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "account",
                type: "publicKey",
                account: "StudentInfo",
                path: "student_intro",
              },
              {
                kind: "account",
                type: "u64",
                account: "ReplyCounter",
                path: "reply_counter.counter",
              },
            ],
          },
        },
        {
          name: "studentIntro",
          isMut: false,
          isSigner: false,
        },
        {
          name: "replyCounter",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "counter",
              },
              {
                kind: "account",
                type: "publicKey",
                account: "StudentInfo",
                path: "student_intro",
              },
            ],
          },
        },
        {
          name: "rewardMint",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "mint",
              },
            ],
          },
        },
        {
          name: "tokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "student",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "reply",
          type: "string",
        },
      ],
    },
    {
      name: "updateStudentIntro",
      accounts: [
        {
          name: "studentIntro",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "account",
                type: "publicKey",
                path: "student",
              },
            ],
          },
        },
        {
          name: "student",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "message",
          type: "string",
        },
      ],
    },
    {
      name: "close",
      accounts: [
        {
          name: "studentIntro",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "account",
                type: "publicKey",
                path: "student",
              },
            ],
          },
        },
        {
          name: "student",
          isMut: true,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: "createRewardMint",
      accounts: [
        {
          name: "rewardMint",
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: "const",
                type: "string",
                value: "mint",
              },
            ],
          },
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMetadataProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "uri",
          type: "string",
        },
        {
          name: "name",
          type: "string",
        },
        {
          name: "symbol",
          type: "string",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "studentInfo",
      type: {
        kind: "struct",
        fields: [
          {
            name: "student",
            type: "publicKey",
          },
          {
            name: "name",
            type: "string",
          },
          {
            name: "message",
            type: "string",
          },
        ],
      },
    },
    {
      name: "replyCounter",
      type: {
        kind: "struct",
        fields: [
          {
            name: "counter",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "reply",
      type: {
        kind: "struct",
        fields: [
          {
            name: "studentinfo",
            type: "publicKey",
          },
          {
            name: "reply",
            type: "string",
          },
        ],
      },
    },
  ],
}
