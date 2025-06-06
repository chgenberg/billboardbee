# ChatBot Setup för BillboardBee

## Miljövariabler

För att aktivera ChatBot med OpenAI, lägg till följande i din `.env` fil (lokalt) eller i Render's miljövariabler:

```
OPENAI_API_KEY=din-openai-api-nyckel-här
```

## Hämta OpenAI API-nyckel

1. Gå till https://platform.openai.com/
2. Logga in eller skapa konto
3. Gå till API Keys
4. Skapa en ny nyckel
5. Kopiera nyckeln och lägg till i miljövariablerna

## Funktioner

ChatBoten har följande funktioner:

- **Automatiska svar** på vanliga frågor om BillboardBee
- **Humor** med bin-relaterade ordlekar 🐝
- **Kortfattade svar** som alltid avslutas korrekt
- **Fallback** till manuell support via hej@billboardbee.com
- **Exempel-frågor** för att hjälpa användare komma igång

## Utan OpenAI API

Om OpenAI API-nyckeln inte är konfigurerad kommer chatboten fortfarande fungera med fördefinierade svar på vanliga frågor. 