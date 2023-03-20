# Zadanie programistyczne - frontend

## Do wykonania prosty serwis: 

### Struktura:

1. Dostęp usera po zalogowaniu
2. Prosty routing:
   - jeśli użytkownik wejdzie na url bez zalogowania, ma zostać przekierowany na stronę logowania
   - jeśli na nieistniejącą - albo do logowania, albo do strony głównej (w zależności od tego, czy jest zalogowany, czy nie)
3. Podstrony (trzy):
   1. Prosty formularz logowania (login/email, hasło, może być 1 przykładowy user lub kilku, bez konieczności rejestracji)
   2. Formularz danych osobowych do wypełnienia i zapisania w bazie
      - min. 6 pól w formularzu (imię, nazwisko etc.)
      - min. trzy typy pól (tekstowe, datowe, select etc)
   3. Tabela do sczytywania i prezentacji danych z bazy w syntetycznej formie
      - możliwość usuwania i edycji elementów

### Technologie:

1. React
   - dowolny sposób bootsrapowania aplikacji (np. CreateReactApp)
   - bez komponentów klasowych - komponenty funkcyjne + hooki
   - dozwolone wszelkie dostępne bliblioteki komponentów
   - zarządzanie stanem przy pomocy dowolnej technologii
2. **TypeScript**
3. Dowlony sposób stylowania (css,scss,styled components etc)
4. Baza - **NIE WYMAGAMY SERWERA**. Dane logowania przykładowych użytkowników oraz z formularzy można zapisać np. do localstorage i symulować asynchroniczne requesty (chodzi o to, aby aplikacja zachowywała się jakby miała kontakt z serwerem dostarczającym dane)
5. Aplikacja umieszczona na publicznym repo github/gitlab/bitbucket

### Co sprawdzamy:

1. Prawidłowe, bebłędne działanie apilikacji zgodnie z wytycznymi + w podstawowym sensie estetykę wykonania
2. Dobre, konsekwentnie stosowane praktyki w TS i React
3. Styl kodu, czytelność
