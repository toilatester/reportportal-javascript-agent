Feature: Demo table sample
  Scenario: Table demo
    Given Sample URL
    When I Input text to URL
    Then I should have <start> <eat> <left> cucumbers
      | start | eat | left |
      | 12    | 5   | 7    |
      | 10    | 5   | 5    |
      | 5     | 5   | 0    |