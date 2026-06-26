# App – Paraciclos do Recife | React Native + Expo

Aplicativo mobile feito em **React Native com Expo (SDK 54)** que ajuda ciclistas
a encontrarem um **paraciclo** (estrutura pública para prender a bicicleta com
segurança) próximo de onde estão.

O app:

1. Consome a API pública de **Paraciclos do Recife** (CTTU / Dados Recife) e
   exibe a lista de pontos na tela.
2. Usa a **localização do usuário** (GPS) para descobrir qual paraciclo está
   mais próximo dele.
3. Permite **traçar a rota no Maps** do celular até o paraciclo escolhido.
4. Salva esse relacionamento (localização + paraciclo) em um **backend** próprio
   e exibe os registros salvos em uma tela.

> Repositório do backend: _(adicione aqui o link do seu repo do backend)_

---

## Por que essa API?

Escolhi os dados de **paraciclos** porque cada ponto é **georreferenciado**
(possui latitude e longitude). Isso permite cruzar com a posição do usuário e
calcular o paraciclo mais próximo, atendendo diretamente ao requisito de
geolocalização da atividade.

Além disso, o app resolve um **problema real do dia a dia**: quem anda de
bicicleta precisa de um lugar seguro para deixá-la ao chegar no destino. Sem
isso, muita gente desiste de usar a bike como meio de transporte.

---

## Funcionalidades

- 📋 Lista de paraciclos reais do Recife, vindos da API pública.
- ℹ️ Tela explicativa sobre o que é um paraciclo e para que serve.
- 📍 Detecção da localização do usuário via GPS.
- 🧭 Cálculo do paraciclo mais próximo (fórmula de Haversine).
- 🗺️ Botão para abrir a rota no Google Maps / Apple Maps do celular.
- 💾 Registro da localização + paraciclo no backend (POST) e listagem (GET).

---

## Tecnologias

- React Native + Expo SDK 54
- React Navigation (navegação entre telas)
- expo-location (geolocalização)
- Linking (abertura do app de mapas do celular)
- fetch (chamadas HTTP)

---

## Estrutura do projeto

```
app/
├── App.js                       # navegação entre as telas
├── app.json                     # config do Expo + permissão de localização
├── package.json
└── src/
    ├── screens/
    │   ├── HomeScreen.js         # lista os paraciclos da API
    │   ├── DetalheScreen.js      # detalhes do paraciclo + botão de rota no Maps
    │   ├── LocalizacaoScreen.js  # GPS + paraciclo mais próximo + salvar (POST)
    │   ├── RegistrosScreen.js    # lista os registros do backend (GET)
    │   └── SobreScreen.js        # explicação sobre paraciclos (apenas front)
    └── services/
        ├── dadosRecife.js        # integração com a API do Dados Recife
        ├── distancia.js          # cálculo do paraciclo mais próximo (Haversine)
        ├── mapa.js               # abre a rota no app de mapas do celular
        └── api.js                # chamadas ao backend (POST/GET)
```

---

## Como rodar localmente

> **Importante:** suba o **backend** antes do app. Veja o README do repositório
> do backend.

1. Instale as dependências:
   ```bash
   cd app
   npm install
   ```

2. **Configure o IP do backend.** Abra `src/services/api.js` e troque o valor de
   `IP_DA_MAQUINA` pelo IP da sua máquina na rede Wi-Fi:
   ```js
   const IP_DA_MAQUINA = "192.168.1.52"; 
   ```
   Descubra o IP com `ipconfig` (Windows) ou `ifconfig` / `ip addr` (Mac/Linux),
   procurando o endereço IPv4 do adaptador **Wi-Fi**. O celular e o computador
   precisam estar na **mesma rede Wi-Fi**.

3. Inicie o Expo:
   ```bash
   npx expo start
   ```

4. Abra o app **Expo Go (versão 54)** no celular e escaneie o QR Code.

---

## Telas

| Tela | Descrição |
|------|-----------|
| **Home** | Lista de paraciclos vindos da API. Toque em um item para ver os detalhes. |
| **Sobre** | Explica o que é um paraciclo, como funciona e para que serve. |
| **Detalhe** | Endereço, bairro, coordenadas e botão para traçar rota no Maps. |
| **Achar mais próximo** | Lê o GPS, mostra o paraciclo mais próximo e salva no backend. |
| **Registros** | Mostra tudo que foi salvo no backend. |

---

## Integração com a API do Dados Recife

O portal usa a plataforma **CKAN**. Em `src/services/dadosRecife.js`, a constante
`RESOURCE_ID` aponta para o recurso do conjunto **Paraciclos do Recife**, e a
busca é feita via `datastore_search`:

```
https://dados.recife.pe.gov.br/api/3/action/datastore_search?resource_id=<ID>
```

Caso a API esteja indisponível ou sem internet, o app usa uma **lista de
paraciclos de exemplo** (fallback), garantindo que ele funcione mesmo offline
durante a demonstração.

---

## Autor

**Lucas Antônio Querubim**