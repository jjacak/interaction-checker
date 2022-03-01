# interaction-checker
Drug interaction checker app made with React.js and css.modules.

The app uses NIH National Library of Medicine APIs:
- RxNorm API getDisplayTerms to support auto-completion in search form (https://lhncbc.nlm.nih.gov/RxNav/APIs/api-RxNorm.getDisplayTerms.html),
- RxNorm findRxcuiByString to find an ID of searched drug (https://lhncbc.nlm.nih.gov/RxNav/APIs/api-RxNorm.findRxcuiByString.html), 
- Drug Interaction API findInteractionsFromList to return a list of interactions between checked drugs (https://lhncbc.nlm.nih.gov/RxNav/APIs/api-Interaction.findInteractionsFromList.html).

