#! /usr/bin/env node

import got from "got";
import { program } from "commander";
import chalk from "chalk";

async function main() {
  program.option("--city <char>", "the city name", "amsterdam");
  program.option("--price-from <char>", "the lower price", "500");
  program.option("--price-to <char>", "the lower price", "2000");
  program.option("--language <char>", "the preferred language", "nl-NL");
  program.parse();
  const options = program.opts();

  const requestBody = {
    aggregationType: ["listing"],
    constructionType: [],
    geoInformation: options.city.toLowerCase(),
    offeringType: ["rent"],
    zoning: ["residential"],
    price: {
      priceRangeType: "RentPerMonth",
      lowerBound: options.priceFrom,
      upperBound: options.priceTo,
    },
    cultureInfo: options.language,
  };
  const url = "https://search-topposition.funda.io/v2.0/search";
  const resp = await got.post(url, { json: requestBody }).json();
  resp.listings.forEach((listing) => {
    console.log(
      `${chalk.blue(listing.address.listingAddress)} ${chalk.green(listing.price)}`
    );
    console.log(chalk.magenta(` https://www.funda.nl${listing.listingUrl}`));
  });
}

await main();
