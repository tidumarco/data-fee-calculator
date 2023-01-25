describe("Data fee calculator", function () {
  it("front page can be opened", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Delivery Fee Calculator");
    cy.contains("Calculate Delivery Fee");
  });

  it("form works and retrieve delivery fee", function () {
    cy.visit("http://localhost:3000");
    cy.get("#value").type(9.87);
    cy.get("#distance").type(1499);
    cy.get("#items").type(3);
    cy.get("#date").click();
    cy.contains(27).click();
    // cy.get("#time")
    //   .click()
    //   .scrollIntoView({ easing: "linear", duration: 3000 })
    //   .contains("3:20");
    cy.get("#submit").click();
    cy.contains("Delivery Fee: € 3.13");
    cy.contains("Friday");
    // cy.contains("15.2");
  });
  it("form works and retrieve delivery fee(10 € cart value)", function () {
    cy.visit("http://localhost:3000");
    cy.get("#value").type(10);
    cy.get("#distance").type(1000);
    cy.get("#items").type(3);
    cy.get("#date").click();
    cy.contains(26).click();
    // cy.get("#time").get("Time").scrollTo(20);
    cy.get("#submit").click();
    cy.contains("Delivery Fee: € 2.00");
  });
  it("form works and retrieve delivery fee(100 € cart value)", function () {
    cy.visit("http://localhost:3000");
    cy.get("#value").type(100);
    cy.get("#distance").type(1000);
    cy.get("#items").type(3);
    cy.get("#date").click();
    cy.contains(26).click();
    // cy.get("#time").get("Time").scrollTo(20);
    cy.get("#submit").click();
    cy.contains("Delivery Fee: € 0.00");
  });
});

//At the moment didn't find a way to make Cypress scroll inside Time selection component in order to test the rush hour.
