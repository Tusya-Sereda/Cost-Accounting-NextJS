describe("example to-do app", () => {
  beforeEach(() => {
    cy.intercept("POST", "/graphql", (req) => {
      req.alias = "api";
    });
  });

  it("add new content", () => {
    cy.visit("/home");
    cy.wait("@api");
    cy.form("lalalaallaa", 250);
    cy.form("bacsbjhbdv", 65454);
  });

  it("delete_cost", () => {
    // cy.getElement("0-task", "> div > div > [data-testid=removeButton]").click() // to touch to button on delete
    cy.getElement("removeButton").first().click().getElement("button_agree").click();
  });

  it("update_cost", () => {
    cy.getElement("updateButton").first().click();
    cy.form('something', 1000);
    cy.getElement("checkButton").click();
  })
});
