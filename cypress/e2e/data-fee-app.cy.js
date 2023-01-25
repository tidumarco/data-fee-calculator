describe("Data fee calculator", function () {
  it("front page can be opened", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Delivery Fee Calculator");
    cy.contains("Calculate Delivery Fee");
  });

  it("form works and retrieve delivery fee", function () {
    cy.visit("http://localhost:3000");
    cy.get("#value").type(10);
    cy.get("#distance").type(2500);
    cy.get("#items").type(13);
    cy.get("#time").click();
    cy.contains(26).click();
    // cy.get("#time").get("Time").scrollTo(20);
    cy.get("#submit").click();
    cy.contains("Delivery Fee: € 10.70");
  });
});
