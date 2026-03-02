import { describe, test, expect, afterEach } from "bun:test";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";

afterEach(cleanup);

describe("LoginForm Tesztek", () => {
  test("megjelenik a fejléc és az input", () => {
    render(<LoginForm />);
    
    // Reguláris kifejezés helyett pontos stringet használunk az elején
    const header = screen.queryByText("Bejelentkezés");
    expect(header).not.toBeNull();
  });

  test("sikeres beküldés folyamata", () => {
    render(<LoginForm />);
    
    // Keressünk az inputra egyszerűbben
    const input = screen.getByPlaceholderText("pelda@email.com");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: 'teszt@mail.hu' } });
    fireEvent.click(button);

    const successMsg = screen.queryByText("Sikeres beküldés!");
    expect(successMsg).not.toBeNull();
  });
});