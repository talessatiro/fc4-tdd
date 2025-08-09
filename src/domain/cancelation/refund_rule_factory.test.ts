import { FullRefund } from "./full_refund";
import { NoRefund } from "./no_refund copy";
import { PartialRefund } from "./partial_refund";
import { RefundRuleFactory } from "./refund_rule_factory";

describe("refund rule factory", () => {
  it("deve retornar FullRefund quando a reserva for cancelada com mais de 7 dias de antecedência", () => {
    const refundRule = RefundRuleFactory.getRefundRule(8);

    expect(refundRule).toBeInstanceOf(FullRefund);
  });

  it.each([[1], [2], [3], [4], [5], [6], [7]])(
    "deve retornar PartialRefund quando a reserva for cancelada com %s dia(s) de antecedência",
    (daysUntilCheckIn) => {
      const refundRule = RefundRuleFactory.getRefundRule(daysUntilCheckIn);

      expect(refundRule).toBeInstanceOf(PartialRefund);
    }
  );

  it("deve retornar NoRefund quando a reserva for cancelada com menos de 1 dia de antecedência", () => {
    const refundRule = RefundRuleFactory.getRefundRule(0);

    expect(refundRule).toBeInstanceOf(NoRefund);
  });
});
