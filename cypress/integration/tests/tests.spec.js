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
    cy.getElement("add_content").should("not.to.be.empty");
    cy.getElement("inputWhere").should("not.have.value");
    cy.getElement("inputHowMuch").should("not.have.value");
    cy.form(
      "inputWhere",
      "inputHowMuch",
      "buttonAdd",
      "lalalalallalaikshdvjkr",
      5454
    );
    cy.getElement("inputWhere").should("not.have.value");
    cy.getElement("inputHowMuch").should("not.have.value");
    cy.form("inputWhere", "inputHowMuch", "buttonAdd", "bacsbjhbdv", 65454);
  });

  it("delete cost in main page", () => {
    // cy.getElement("0-task", "> div > div > [data-testid=removeButton]").click() // to touch to button on delete
    cy.getElement("task_content").should("not.to.be.empty");
    cy.getElement("text_note").should("not.to.be.empty");
    cy.getElement("removeButton").first().click()
    cy.getElement('modal_window').should('have.button', 'button_agree'); /*MISTAKE */
    cy.getElement("button_agree").click().wait("@api");
  });

  it("delete cost and come back in main page", () => {
    cy.getElement("removeButton")
      .first()
      .click()
      .getElement("button_disagree")
      .click();
  });

  it("update cost and come back in main page", () => {
    cy.getElement("updateButton").first().click();
    cy.getElement("backButton").click();
  });

  it("update cost in main page", () => {
    cy.getElement("updateButton").first().click();
    cy.form("changeWhere", "changeHowMuch", "checkButton", "we check it", 100);
    cy.wait("@api");
  });

  it("go back in main page", () => {
    cy.getElement("updateButton").first().click();
    cy.form("changeWhere", "changeHowMuch", "", "we check it", 100);
    cy.getElement("backButton").first().click();
  });

  it("info about one task", () => {
    cy.getElement("info_about_task").first().click();
    cy.location("pathname").should("include", "/node/");
  });

  it("change one cost", () => {
    cy.getElement("edit_button").click();
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
    cy.getElement("deleteById").click();
    cy.getElement("button_agree").click().wait("@api");
    cy.location("pathname").should("include", "/home");
  });

  it("working button onHome", () => {
    cy.location("pathname").should("include", "/home");
    cy.getElement("info_about_task").first().click().wait("@api");
    cy.location("pathname").should("include", "/node/");
    cy.getElement("linkOnHome").click();
  });
});
