def exponent_rec(base, power)
  return 1 if power == 0
  return 1.0 / exponent_rec(base, power * -1) if power < 0
  return base * exponent_rec(base, power - 1) if power.odd?

  # Power is even.
  half = exponent_rec(base, power / 2)
  half * half
end
