import { cloneElement } from "react";

const valueString = "sempaaaai";
const valueNumber = 45;

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("example to-do app", () => {
  beforeEach(() => {
    cy.intercept("POST", "/graphql", (req) => {
      req.alias = "api";
    });
  });

  it("add new magazine", () => {
    cy.visit("/home");
    cy.wait("@api");
    cy.location("pathname").should("include", "/home");
    cy.getElement("add_content");
    cy.getElement("inputWhere").should("not.have.value");
    cy.getElement("inputHowMuch").should("not.have.value");
    cy.form(
      "inputWhere",
      "inputHowMuch",
      "buttonAdd",
      valueString,
      valueNumber
    );
    cy.getElement("inputWhere").should("not.have.value");
    cy.getElement("inputHowMuch").should("not.have.value");
    cy.form(
      "inputWhere",
      "inputHowMuch",
      "buttonAdd",
      valueString,
      valueNumber
    );
  });

  it("delete one cost", () => {
    // cy.getElement("0-task", "> div > div > [data-testid=removeButton]").click() // to touch to button on delete
    cy.getElement("task_content");
    cy.getElement("text_note");
    cy.getElement("valueCostPlace");
    cy.getElement("removeButton").first().click();
    cy.getElement("modal_window");
    cy.getElement("button_agree")
      .should("have.text", "Agree")
      .click()
      .wait("@api");
  });

  it("delete cost, but click on button disagree", () => {
    cy.getElement("text_note").should("not.to.be.empty");
    cy.getElement("valueCostPlace").should("not.to.be.empty");
    cy.getElement("removeButton")
      .first()
      .click()
      .getElement("modal_window")
      .should("not.to.be.empty")
      .getElement("button_disagree")
      .click();
  });

  it("update cost, but click on come back", () => {
    cy.getElement("text_note").should("not.to.be.empty");
    cy.getElement("valueCostPlace");
    cy.getElement("updateButton").first().click();
    cy.getElement("input_note");
    cy.getElement("changeWhere").should("not.have.value");
    cy.getElement("changeHowMuch").should("not.have.value");
    cy.getElement("backButton").click();
  });

  it("update cost in main page", () => {
    cy.getElement("text_note");
    cy.getElement("valueCostPlace");
    cy.getElement("updateButton").first().click();
    cy.getElement("input_note");
    cy.getElement("changeWhere").should("not.have.value");
    cy.getElement("changeHowMuch").should("not.have.value");
    cy.form("changeWhere", "changeHowMuch", "backButton", "we check it", 100);
    cy.getElement("updateButton").first().click();
    cy.getElement("changeWhere").should("not.have.value");
    cy.getElement("changeHowMuch").should("not.have.value");
    cy.form("changeWhere", "changeHowMuch", "checkButton", "we check it", 100);
    cy.wait("@api");
  });

  it("info about one task", () => {
    cy.location("pathname").should("include", "/home");
    cy.getElement("info_about_task").first().click();
    cy.location("pathname").should("include", "/node/");
  });

  it("change one cost by click on button a and s", () => {
    cy.location("pathname").should("include", "/node/");
    cy.getElement("content_purchase");
    cy.get("body").type("{ctrl}{a}");
    cy.getElement("changeInfoWhere").should("not.have.value");
    cy.getElement("changeInfoHowMuch").should("not.have.value");
    cy.form(
      "changeInfoWhere",
      "changeInfoHowMuch",
      "checkInfoButton",
      "good",
      100
    );
  });

  it("change one cost", () => {
    cy.location("pathname").should("include", "/node/");
    cy.getElement("content_purchase");
    cy.getElement("text_purchase");
    cy.getElement("edit_button").click();
    cy.getElement("add_new_content_on_one_purchase");
    cy.getElement("changeInfoWhere").should("not.have.value");
    cy.getElement("changeInfoHowMuch").should("not.have.value");
    cy.form(
      "changeInfoWhere",
      "changeInfoHowMuch",
      "checkInfoButton",
      "puk",
      54
    );
  });

  it("delete one cost", () => {
    cy.location("pathname").should("include", "/node/");
    cy.getElement("content_purchase");
    cy.getElement("text_purchase");
    cy.getElement("deleteById").click();
    cy.getElement("modal_window");
    cy.getElement("button_agree").click().wait("@api");
    cy.location("pathname").should("include", "/home");
  });

  it("working button onHome", () => {
    cy.location("pathname").should("include", "/home");
    cy.getElement("info_about_task").first().click().wait("@api");
    cy.location("pathname").should("include", "/node/");
    cy.getElement("content_purchase");
    cy.getElement("text_purchase");
    cy.getElement("linkOnHome").click();
    cy.location("pathname").should("include", "/home");
  });
});
