import "dotenv/config";

const { SDK_KEY } = process.env;

if (!SDK_KEY) {
  throw new Error(
    "Optimizely SDK key must be provided for the Feature Toggle to work."
  );
}

console.log("Hello");
console.log(SDK_KEY);
