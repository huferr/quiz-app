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

- Choose profile pic (specific images provided by us);
- Change username;
- Nível (Respostas corretas);

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

### Backend

- Triggers;

  - `handle_updated_at` (Populates updated_at column)
  - `update_battle_badges` (Updates battle badges)
  - `update_correct_answers_trigger` (Triggers `update_correct_answers()` function)
  - `update_streak_badges` (Updates streak badges)
  - `on_auth_user_created` (reflect new users in `Profiles` table)

- Functions;
  - `handle_new_user()`
  - `update_battle_badges()`
  - `update_battle_score()`
  - `update_correct_answers()`
  - `update_free_coins()`
  - `update_geo_correct_answers()`
  - `update_history_correct_answers()`
  - `update_math_correct_answers()`
  - `update_paid_coins()`
  - `update_science_correct_answers()`
  - `update_streak_badges()`
  - `update_wrong_answers_amount()`
- Tables;
  - `profiles`
  - `questions`
  - `battles`
  - `user (auth)`
