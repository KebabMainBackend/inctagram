
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/api/v1": {
        "get": {
          "operationId": "AppController_getHello",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/api/v1/auth/registration": {
        "post": {
          "operationId": "AuthController_register",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AuthRegisterDto"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": "An email with a verification code has been sent to the specified email address"
            },
            "400": {
              "description": "Incorrect input data",
              "content": {
                "application/json": {
                  "example": {
                    "errorsMessages": [
                      {
                        "message": "string",
                        "field": "string"
                      }
                    ]
                  }
                }
              }
            },
            "429": {
              "description": "More than 5 attempts from one IP-address during 10 seconds"
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/api/v1/auth/login": {
        "post": {
          "operationId": "AuthController_login",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AuthLoginDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "success",
              "content": {
                "application/json": {
                  "example": {
                    "accessToken": "string"
                  }
                }
              }
            },
            "400": {
              "description": "Incorrect input data",
              "content": {
                "application/json": {
                  "example": {
                    "errorsMessages": [
                      {
                        "message": "string",
                        "field": "string"
                      }
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "429": {
              "description": "More than 5 attempts from one IP-address during 10 seconds"
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/api/v1/auth/password-recovery": {
        "post": {
          "operationId": "AuthController_passwordRecovery",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AuthLoginDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "success",
              "content": {
                "application/json": {
                  "example": {
                    "accessToken": "string"
                  }
                }
              }
            },
            "400": {
              "description": "Incorrect input data",
              "content": {
                "application/json": {
                  "example": {
                    "errorsMessages": [
                      {
                        "message": "string",
                        "field": "string"
                      }
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "429": {
              "description": "More than 5 attempts from one IP-address during 10 seconds"
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/api/v1/auth/logout": {
        "post": {
          "operationId": "AuthController_logout",
          "parameters": [],
          "responses": {
            "204": {
              "description": "success"
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/api/v1/auth/github/login": {
        "post": {
          "operationId": "GithubController_login",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AuthRegisterDto"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": "An email with a verification code has been sent to the specified email address"
            },
            "400": {
              "description": "Incorrect input data",
              "content": {
                "application/json": {
                  "example": {
                    "errorsMessages": [
                      {
                        "message": "string",
                        "field": "string"
                      }
                    ]
                  }
                }
              }
            },
            "429": {
              "description": "More than 5 attempts from one IP-address during 10 seconds"
            }
          },
          "tags": [
            "GitHub-OAuth2"
          ]
        }
      },
      "/api/v1/auth/google/login": {
        "post": {
          "operationId": "GoogleController_register",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AuthRegisterDto"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": "An email with a verification code has been sent to the specified email address"
            },
            "400": {
              "description": "Incorrect input data",
              "content": {
                "application/json": {
                  "example": {
                    "errorsMessages": [
                      {
                        "message": "string",
                        "field": "string"
                      }
                    ]
                  }
                }
              }
            },
            "429": {
              "description": "More than 5 attempts from one IP-address during 10 seconds"
            }
          },
          "tags": [
            "Google-OAuth2"
          ]
        }
      }
    },
    "info": {
      "title": "Inctagram",
      "description": "The Inctagram API description from Kebab team",
      "version": "0.1",
      "contact": {}
    },
    "tags": [],
    "servers": [],
    "components": {
      "securitySchemes": {
        "bearer": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        }
      },
      "schemas": {
        "AuthRegisterDto": {
          "type": "object",
          "properties": {
            "username": {
              "type": "string",
              "description": "username: name for create/registration User",
              "example": "string"
            },
            "email": {
              "type": "string",
              "description": "email: email for create/registration User",
              "example": "example@gmail.com"
            },
            "password": {
              "type": "string",
              "description": "password: password for create/registration User",
              "example": "Pa$w0rD"
            }
          },
          "required": [
            "username",
            "email",
            "password"
          ]
        },
        "AuthLoginDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": "email: email for create/registration User",
              "example": "example@gmail.com"
            },
            "password": {
              "type": "string",
              "description": "password: password for create/registration User",
              "example": "Pa$w0rD"
            }
          },
          "required": [
            "email",
            "password"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
