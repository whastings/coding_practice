import { useActionState, useMemo } from "react";

type Operator = "+" | "-" | "*" | "/";

interface CalcInput {
  operand1: number;
  operand2: number;
  operator: Operator;
}

function React19Forms() {
  const [state, action] = useActionState<CalcInput | null>((_, formData) => {
    const operand1 = formData.get("operand1");
    const operand2 = formData.get("operand2");
    const operator = formData.get("operator");

    if (operand1 == null || operand2 == null || operator == null) {
      return null;
    }

    return {
      operand1: Number(operand1),
      operand2: Number(operand2),
      operator: operator as Operator,
    };
  }, null);

  const answer = useMemo(() => {
    if (state == null) {
      return null;
    }

    const { operand1, operand2, operator } = state;

    switch (operator) {
      case "+":
        return operand1 + operand2;
      case "-":
        return operand1 - operand2;
      case "*":
        return operand1 * operand2;
      case "/":
        return operand1 / operand2;
    }
  }, [state]);

  return (
    <main>
      <h1>React 19 Forms</h1>

      <h2>Simple Calculator</h2>
      <form action={action}>
        <label>Operand 1</label>
        <input type="number" name="operand1" />
        <label>Operand 2</label>
        <input type="number" name="operand2" />
        <label>Operator</label>
        <select name="operator">
          <option>+</option>
          <option>-</option>
          <option>*</option>
          <option>/</option>
        </select>
        <button type="submit">Calculate</button>
      </form>

      <h3>Result</h3>
      {answer}
    </main>
  );
}

export default React19Forms;
