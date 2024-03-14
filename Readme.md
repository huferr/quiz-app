# Business Plan (Quiz App)

## Open Questions

- **App name**: ?
- **Meios de monetização**: AdMob, moeda comprável, pacotes, free ads version, ... (?)

## Features

### Modos de jogo:

- Maratona;
- Batalhas;
- Perguntas Diárias;
- Torneios;
- Modo educativo;

### User

- Add profile pic;
- Change username;
- Nível;
- Torneios ganho (coroas/badges);

## MVP 1.0

- Maratona (31/01/24 - ✅)
- Batalhas (31/01/24 - ✅)
- User Level (09/03/24 - ✅)
- Ranking
- Emblemas

## 📘 Documentation

### Specs

- (FE) React Native (Expo / Expo Router);
- (BE) Supabase (PostgreSQL);
- (BE) SQL Functions;

### SQL Functions


### Backend

 - Triggers;
    - `update_badges`
    - `on_auth_user_created`

- Functions;
    - `update_correct_answers_amount()`
    - `update_wrong_answers_amount()`
    - `update_badges_trigger()`
    - `handle_new_user()`
    - `update_battle_score()`
    - `update_free_coins()`
    - `update_paid_coins()`
    - `update_points()`
    
- Tables;
    - `profiles`
    - `questions`
    - `battles`
    - `user (auth)`

### Frontend

- React Query;
- Axios;

