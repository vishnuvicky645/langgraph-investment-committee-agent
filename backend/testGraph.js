const { runInvestmentGraph } = require("./langgraph/investmentGraph");

async function test() {
  const result = await runInvestmentGraph("NVIDIA");
  console.log(result);
}

test();