const { greet } = require("../src/greet");

describe("greet", () => {
  it("prints a greeting with the provided name", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    greet("Alice");
    expect(spy).toHaveBeenCalledWith("Hello, Alice");
    spy.mockRestore();
  });
});
