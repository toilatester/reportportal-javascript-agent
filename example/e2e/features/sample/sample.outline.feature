Feature: Demo scenario outline sample
  Scenario Outline: Scenario Outline demo
    Given There are <start> cucumbers
    When I eat <eat> cucumbers
    Then I should have <left> cucumbers
    Examples:
      | start | eat | left |
      | 12    | 5   | 7    |
      | 10    | 5   | 5    |
      | 5     | 5   | 0    |