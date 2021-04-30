/// <reference types="cypress" />

describe("Ongs", () => {
  it("Deve poder realizar um cadastro!", () => {
    cy.visit("http://localhost:3000/register");

    cy.get("[data-cy=name]").type("Dogs queridos");
    cy.get("[data-cy=email]").type("dogs@queridos.com");
    cy.get("[data-cy=whatsapp]").type("47999999999");
    cy.get("[data-cy=city]").type("Joinville");
    cy.get("[data-cy=uf]").type("SC");
    cy.route("POST", "**/ongs").as("postOng");
    cy.get("[data-cy=submit]").click();

    cy.wait("@postOng").then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.response.body).has.property("id");
      expect(xhr.response.body.id).is.not.null;
    });
  });

  it("Deve poder realizar um login!", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[data-cy=id]").type(Cypress.env("createdOngId"));
    cy.get("[data-cy=button-login]").click();
  });

  it("Deve poder realizar um logout!", () => {
    cy.login();
    cy.get("[data-cy=button-logout]").click();
  });

  it("Deve poder cadastrar um novo caso!", () => {
    cy.login();
    cy.get("[data-cy=button-new-incident]").click();

    cy.get("[data-cy=title]").type("Animal abandonado");
    cy.get("[data-cy=description]").type(
      "Animal precisa de apoio pra ter onde morar"
    );
    cy.get("[data-cy=value]").type(200);
    cy.route("POST", "**/incidents").as("newIncident");
    cy.get("[data-cy=button-submit]").click();

    cy.wait("@newIncident").then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.response.body).has.property("id");
      expect(xhr.response.body.id).is.not.null;
    });
  });

  it("Deve poder excluir um caso!", () => {
    cy.createNewIncident();
    cy.login();

    cy.route("DELETE", "**/incidents/*").as("deleteIncident");
    cy.get("li > button > svg").click();

    cy.wait("@deleteIncident").then((xhr) => {
      expect(xhr.status).be.eq(204);
      expect(xhr.response.body).be.empty;
    });
  });
});
