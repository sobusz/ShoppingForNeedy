# needy.

## Opis projektu:
  ***needy.*** to aplikacja skierowana głównie do osób starszych lub takich, które nie chcą ryzykować wyjścia z domu. 
  Po drugiej stronie aplikacji będzie mógł znaleźć się każdy, kto tylko zechce pomóc. Aby nasz projekt działał sprawnie potrzebujemy wolontariuszy, którzy byliby w stanie zrobić zakupy, wyjść z psem na spacer lub po prostu porozmawiać. 
  Projekt opiera się o system pinów na mapie reprezentujących wolontariuszy gotowych nieść pomoc w danej okolicy. 


## Autorzy projektu: 
-	**Miłosz Sobiecki**
-	**Stanisław Gardziewicz**
-	**Szymon Zabrocki**

## Prawa autorskie:
Aplikacja powstanie na licencji MIT, całość posiadać będzie otwarty kod. Nasz projekt jest w pełni prospołeczny i chcielibyśmy aby mógł rozwijać się dalej.

## Specyfikacja wymagań:
### Wymagania funkcjonalne:
- System powinien wyświetlić mapę regionu wraz z orientacyjną lokalizacją wolonariuszy w postaci pinezek na mapie.
- System powinien umożliwić wolontariuszowi założenie konta oraz ustawienie w swoim profilu gotowości do pełnienia konkretnych funkcji oraz zapisać je w bazie danych w celu dalszego wyświetlenia ich w postaci pinów na mapie.
- Po kliknięciu na pinezkę system powinien wyświetlić podstawowe informacje o wolontariuszu: imię, numer telefonu oraz zakres czynności, które ten jest gotowy wykonać. 

### Wymagania niefunkcjonalne:
- System powinien być w stanie obsłużyć do ok. 100 użytkowników jednocześnie.
- Aplikacja będzie w przyjemnej dla oka, stonowanej kolorystyce.

## Architektura
### Architektura rozwoju
1. Ionic  
2. Firebase Authentication  
3. Firebase Storage  
4. jQuery  
5. Cordova  
6. Visual Studio  
7. Angular 9  

## Scenariusze testów - testy akceptacyjne
### 1 - Instalacja aplikacji na urządzeniu mobilnym
**Cel testu:** Testowanie poprawnego pobierania oraz instalowania aplikacji needy na urządzeniu mobilnym.  
**Scenariusz (kroki testowe):**   
#### Akcje użytkownika:  
1. Pobranie pliku needy.apk z internetu.

#### Odpowiedź systemu:  
1. Urządzenie mobilne pobierze aplikacje.
2. Urządzenie mobilne poinformuję nas o zainstalowaniu aplikacji.

### 2 - Rejestracja wolontariusza
**Cel testu:** Testowanie rejestracji.  
**Sposób dostępu:** Widok wywoływany po kliknięciu przycisku 'Dołącz jako wolontariusz'.   
**Scenariusz (kroki testowe):**   
#### Akcje użytkownika:  
1. Wybranie przycisku 'Dołącz jako wolontariusz'.
2. Prawidłowe wypełnienie pola 'Email' oraz 'Hasło'
3. Wybranie przycisku 'Zarejestruj się'

#### Odpowiedź systemu:  
1. Aplikacja wyświetli napis 'Twoje konto zostało utworzone. Zaloguj się.'
2. W bazie danych powstanie nowy profil.

### 3 - Logowanie wolontariusza
**Cel testu:** Testowanie logowania.  
**Sposób dostępu:** Widok wywoływany po wybraniu przycisku 'Logowanie'.  
**Scenariusz (kroki testowe):**   
#### Akcje użytkownika:  
1. Wybranie przycisku 'Logowanie'.
2. Prawidłowe wypełnienie pola 'Email' oraz 'Hasło'
3. Wybranie przycisku 'Zaloguj się'

#### Odpowiedź systemu:  
1. Aplikacja przeniesie użytkownika na widok panelu wolontariusza.

### 4 - Utworzenie znacznika wolontariusza
**Cel testu:** Testowanie funkcjonalności tworzenia znacznika wolontariusza.  
**Sposób dostępu:** Widok wywoływany po wybraniu przycisku 'Panel wolontariusza' będąc zalogowanym.   
**Scenariusz (kroki testowe):**   
#### Akcje użytkownika:  
1. Wybranie przycisku 'Panel wolontariusza' będac zalogowanym.
2. Wypełnienie pola z imieniem, numerem telefonu.
3. Zaznaczenie odpowiednich kontrolek oznaczających zakres pomocy.
3. Wybranie przycisku 'Zapisz'

#### Odpowiedź systemu:  
1. Aplikacja wyświetli powiadomienie 'Twoje ustawienia zostały zapisane'.
2. Na mapie powstanie znacznik z danymi wolontariusza.

### 5 - Lokalizowanie użytkownika na mapie
**Cel testu:** Testowanie funkcjonalności lokalizowania użytkownika na mapie.  
**Sposób dostępu:** Widok główny aplikacji.  
**Scenariusz (kroki testowe):**   
#### Akcje użytkownika:  
1. Włączenie aplikacji.

#### Odpowiedź systemu:  
1. Aplikacja odświeży mapę, wycentrowując się w miejscu lokacji danego użytkownika.

### 6 - Przeglądanie znacznika na mapie
**Cel testu:** Testowanie działania wyświetlania danych z znacznika na mapie.  
**Sposób dostępu:** Widok główny aplikacji.  
**Scenariusz (kroki testowe):**   
#### Akcje użytkownika:  
1. Wybranie znacznika z mapy.

#### Odpowiedź systemu:  
1. Aplikacja w miejscu znacznika wyświetli okno z danymi wolontariusza i zakresem w którym będzie w stanie on pomóc

### 7 - Przeglądanie informacji o aplikacji
**Cel testu:** Testowanie funkcjonalności wyświetlenia slajdów z informacjami o aplikacji.  
**Sposób dostępu:** Widok wywoływany po wybraniu przycisku 'Jak to działa?'  
**Scenariusz (kroki testowe):**   
#### Akcje użytkownika:  
1. Wybranie przycisku 'Jak to działa?'.
2. Przeciąganie po ekranie kolejnych slajdów.

#### Odpowiedź systemu:  
1. Aplikacja wyświetli pierwszy slajd z informacjami o aplikacji.
2. Po przeciągnieciu ekranu aplikacja wyświetli kolejny slajd.

### 8 - Korzystanie z przewijania mapy
**Cel testu:** Testowanie mapy.  
**Sposób dostępu:** Widok główny aplikacji.  
**Scenariusz (kroki testowe):**   
#### Akcje użytkownika:  
1. Przeciąganie ekranu na mapie.

#### Odpowiedź systemu:  
1. Aplikacja płynnie dostosuje widok mapy do nowego miejsca wskazanego przez przeciągnięcie ekranu przez użytkownika.

### 9 - Korzystanie z zmieniania dystansu widoku mapy
**Cel testu:** Testowanie działania zmieniania dystansu widoku mapy.  
**Sposób dostępu:** Widok główny aplikacji.  
**Scenariusz (kroki testowe):**   
#### Akcje użytkownika:  
1. Wybranie przycisku '+' lub '-' na mapie.
2. Przewijanie rolki myszki z wciśniętym klawiszem CTRL.
3. Wykonanie gestu uszczypnięcia ekranu palcami.

#### Odpowiedź systemu:  
1. Aplikacja płynnie dostosuje przybliżenie mapy zgodnie z akcją użytkownika.

### 10 - Wylogowywanie
**Cel testu:** Testowanie funkcjonalności wylogowywania.  
**Sposób dostępu:** Widok wywoływany po wybraniu przycisku 'Wyloguj'  
**Scenariusz (kroki testowe):**    
#### Akcje użytkownika:  
1. Wybranie przycisku 'Wyloguj'.

#### Odpowiedź systemu:  
1. Aplikacja wyświetli widok główny aplikacji.
2. Użytkownik zostanie wylogowany i utraci możliwość wejścia do panelu wolontariusza.
