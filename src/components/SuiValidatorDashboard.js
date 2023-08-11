import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@material-tailwind/react";

const SuiValidatorDashboard = () => {
  const [validators, setValidators] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [validatorAddress, setValidatorAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const address = e.target.address.value;
    setValidatorAddress(address);
  };

  useEffect(() => {
    axios
      .get("https://rpc-mainnet.suiscan.xyz/metrics")
      .then((response) => {
        setValidators(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (validators.length > 0 && validatorAddress !== "") {
      const metricsData = validators
        .filter((validator) => validator.address === validatorAddress)
        .map((validator) => {
          const rewardsEarnedInUSD = validator.rewards.reduce(
            (total, reward) => total + reward.amount,
            0
          );
          const projectedRewardsEarnedInUSD =
            (validator.stake * validator.apy * 365) / 100;

          // Assuming you have API access for APY, commission, pool share, gas price, and epoch reward
          const profit = rewardsEarnedInUSD - metrics.hardwareCostEstimation.monthlyCost;

          return {
            totalStaked: validator.stake,
            rewardsEarnedInUSD,
            projectedRewardsEarnedInUSD,
            hardwareCostEstimation: {
              hardwareProviders: [
                "LatitudeSh",
                "Terraswitch",
                "Contabo",
                "CherryServers",
              ],
              monthlyCost: {
                LatitudeSh: 100,
                Terraswitch: 200,
                Contabo: 300,
                CherryServers: 400,
              },
            },
            profit,
          };
        });
      setMetrics(metricsData);
    }
  }, [validators, validatorAddress]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 shadow-lg rounded-lg">
      <div className="w-full max-w-1/2 table-auto text-left p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Sui Validator Dashboard</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="address"
            placeholder="Validator Address"
            value={validatorAddress}
            onChange={(event) => setValidatorAddress(event.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-600"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Submit Validator
          </button>
        </form>
        <div className="mt-10">
          <Card className="shadow-lg bg-white rounded-lg overflow-hidden">
            <div className="h-full w-full overflow-scroll">
              <table className="w-full max-w-1/2 table-auto text-left">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="py-2 px-4 text-left">Total Staked</th>
                    <th className="py-2 px-4 text-left">Rewards Earned (USD)</th>
                    <th className="py-2 px-4 text-left">Projected Rewards (USD)</th>
                    <th className="py-2 px-4 text-left">Hardware Cost Estimation</th>
                    <th className="py-2 px-4 text-left">Profit</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {metrics.map((metric, index) => (
                    <tr key={index} className="bg-white">
                      <td className="py-3 px-4">{metric.totalStaked}</td>
                      <td className="py-3 px-4">{metric.rewardsEarnedInUSD}</td>
                      <td className="py-3 px-4">
                        {metric.projectedRewardsEarnedInUSD}
                      </td>
                      <td className="py-3 px-4">
                        {metric.hardwareCostEstimation.monthlyCost}
                      </td>
                      <td className="py-3 px-4">{metric.profit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SuiValidatorDashboard;
