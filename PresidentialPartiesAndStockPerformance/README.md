# Presidential Parties And Stock Performance

A Bruce Choe and Dylan Wong Research Project

## Table of Contents

* [Abstract](#abstract)
* [Sourcing Data](#sourcing-data)
  * [GDP](#gdp)
  * [Index Funds](#index-funds)
  * [Recession / Expansion Periods](#recession-/-expansion-periods)
* [Methodology](#methodology)
* [Results](#results)
* [Limitations](#limitations)
* [Future Plans](#future-plans)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->
## Abstract
The purpose of this research project is to determine if there is a correlation between presidential party affiliation and the performance of the U.S. economy? We will compare the behavior of key economic indicators such as the real GDP and Total Market Index Funds (such as the S&P 500, Dow Jones, et cetera). If we find a statistically significant difference in these factors based on historical presidential party affiliation, we will try to gain insight as to the reason for said difference. Economic expansion vs recession periods, presidential term lag factors via autocorrelation, and several other factors will be tested to explain the potential difference in economic performance during U.S. presidencies.

<!-- SOURCING DATA -->
## Sourcing Data

We will begin this project using open source stock and GDP data described below. Our hope is that with future research funding we will be able to pay for more complete and accurate data to substantiate our findings.

### GDP

[Bureau of Economic Analysis](https://apps.bea.gov/iTable/index_nipa.cfm), a federal statistical agency that provides formal data on the U.S. economy.

### Index Funds

Using [Yahoo Finance](https://finance.yahoo.com) we can get reasonably accurate opening and closing prices to calculate percentage increase/decrease ourselves. However, yahoo finance provides very little information on the indexes beyond that.

### Recession / Expansion Periods
National Bureau of Economic Research, a private nonprofit research organization. Has contracts with the Department of Commerce, very reliable data. 

The [NBER: National Bureau of Economic Research](https://www.nber.org/research/data/us-business-cycle-expansions-and-contractions) traditional definition of a recession is that it is a significant decline in economic activity that is spread across the economy and that lasts more than a few months. The committee's view is that while each of the three criteria—depth, diffusion, and duration—needs to be met individually to some degree, extreme conditions revealed by one criterion may partially offset weaker indications from another. While other economists define recession as two consecutive periods of decline in real gdp. We will be testing both cases.

<!-- METHODOLOGY -->
## Methodology

We first calculate the change in economic indicator on a yearly and quarterly basis, then we sort these data points based on presidential party affiliation and compare the respective average growth. To calculate real gdp, we take percent change from the preceding period. For stock data, we use open and adjusted close prices to determine annual total returns. We account for stock splits, dividends, and rights offerings. This is implemented by the following snippet of [python code](https://github.com/Wong-Innovations/PresidentialPartiesAndStockPerformance/blob/aff5aa3d0661e8f8dfda7234b4a89d7ffe239407/IXIC/IXIC.py#L119-L130). The next step is to calculate the likelihood that the Democratic average would vary from the Republican average by the amount observed. For this we calculate t-scores in both directions and use the resulting p-value to say with a given confidence that there is a resulting corelation. More can be learned about t-scores [here](https://www.statisticshowto.com/probability-and-statistics/t-distribution/t-score-formula/), we determined this statistical significance test to be the most appropriate for our data set since it take into account the degrees of freedom (number of samples). If we had a VERY large dataset a z-score would be just as appropriate since the data would be normally distributed.

<!-- RESULTS -->
## Results

Each folder in the repository consists of the source data, 1-2 python files which sort and average the data, and an index.html file which uses Chart.JS to visualize the data.

```bash
+-- IXIC
|   +-- index.html
|   +-- ixic.csv
|   +-- IXIC.py
|   +-- tcalc_year.py
+-- ...
+-- README.md
```

Below is a table summarizing the findings of each python file. Values in () are the t-scores in each average.

| Indicator    | Democratic     | Republican    | Difference | p-value |
|--------------|----------------|---------------|------------|---------|
| GDP          | +4.56% (3.26)  | +1.92% (4.78) | 2.64%      | 0.0006  |
| S&P 500      | +10.46% (2.29) | +4.75% (1.94) | 5.71%      | 0.0215  |
| NASDAQ       | +20.02% (2.72) | +7.90% (2.20) | 12.12%     | 0.0125  |
| Dow Jones    | +9.96% (2.72)  | +6.27% (1.69) | 3.69%      | 0.0303  |
| Russell 3000 | +14.00% (2.63) | +6.05% (1.72) | 7.95%      | 0.0305  |

95% certainty that presidential party affiliation is correlated with the performance of the U.S. economy.

Degrees of Freedom are omitted from the table but are used in tcalc_year.py to determine the p-values. Each p-value tells us the likelihood that we would observe the historical data given the null hypothesis is true, the null hypothesis in this case is that presidential party affiliation is not correlated with U.S. economic performance.

As a small aside we also used NBER recession data to determine that in the last 105 years, 238 months were recessions and 71.84% of these months we during Republican terms. A t-test yields a p-value of 0.0001, so while we speculate this bares a significant weight in the difference between economic performance, we will require further research to find why the recessions are so skewed as well as what other variables are responsible for the D-R delta.

<!-- LIMITATIONS -->
## Limitations

While there is a correlation, we can not assume why that correlation exists. 
More research is needed to understand if it's Democratic economic policies that are creating this effect, or if it's some external factor. 
Possible speculation includes: party affiliation of congress, business cycles and periods of contraction/expansion, the misery index, oil prices, and more. 

Additionally, gdp and stock market data does not necessarily reflect the experience of an average person. GDP is a "measure of output, not of well-being". Currently, the United States has technically been in a recession since February but stock data is still positive.   

<!-- FUTURE PLANS -->
## Future Plans

Our future plans with this project is to source more data. Data on other historical factors could help us shed further light on the multivariate reason for the D-R economic gap. Reliable data for these niche but impactful phenomena is often locked behind paywalls, so funding future research will be imperative in limiting the expansiveness of factors we consider to effect the historical D-R gap. A cursory look through prior research on this topic has not yielded any quantitatively supported speculations for the gap. Additionally, having a professor ensure our work is mathematically sane would be invaluable. In general, we'd like to find a mentor to ensure we're doing our research properly. Since this was just a hackathon project, We still need to create a research proposal, apply for funding grants, and generally begin the process of formalizing our research. This is a process we're both new to, so any help is always appreciated. 

<!-- CONTACT -->
## Contact

Please contact us with any questions about our research or with any business related propositions.

Bruce Choe: [Github](https://github.com/BruceChoe), [bruceleechoe@gmail.com](bruceleechoe@gmail.com)
Dylan Wong: [Github](https://github.com/Wong-Innovations), [dylanwong@nevada.unr.edu](dylanwong@nevada.unr.edu)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

Thank you to [UNR ACM](https://acm.cse.unr.edu/) for hosting the hackathon that provided the inspiration and served as a launch pad for this project.
Additionally thank you to all the professors, colleagues, and family who support our education.
