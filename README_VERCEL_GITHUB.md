
# Deploy HOGS CRM z GitHub‑a na Vercel

Poniżej **dokładny** przepis w 10 krokach. Wystarczy przekopiować komendy.

---

## 1. Załóż nowe repozytorium na GitHubie

1. Zaloguj się na github.com, kliknij **New → Create a new repository**.
2. Nazwij repo np. `hogs-crm`.
3. NIE zaznaczaj „Initialize with README” – repo będzie puste.

---

## 2. Sklonuj puste repo lokalnie i skopiuj pliki projektu

```bash
git clone https://github.com/<twoje konto>/hogs-crm.git
cd hogs-crm
# załóżmy, że paczkę rozpakowałeś w katalogu ~/Pobrane/hogs-crm-vercel
cp -r ~/Pobrane/hogs-crm-vercel/* .
git add .
git commit -m "Initial commit – HOGS CRM"
git push origin main
```

---

## 3. Podłącz repo do Vercel

1. Wejdź na **https://vercel.com/dashboard** i kliknij **Add New → Project**.
2. Wybierz GitHub i autoryzuj dostęp (jeśli to pierwsze użycie).
3. Wybierz repo `hogs-crm` z listy.
4. Vercel automatycznie wykryje Next.js.

---

## 4. Ustaw zmienną środowiskową `DATABASE_URL`

W kreatorze projektu Vercel:

| Key | Value |
|-----|-------|
| **DATABASE_URL** | `mysql://root:da2xY2vyCVrxlb2Q@54.38.137.2:3706/kontrahenci_db` |

> Pod *Encrypt* zostaw włączone (domyślnie).

Kliknij **Add** i przejdź dalej.

---

## 5. Pierwszy deploy

Wystarczy kliknąć **Deploy**.  
Vercel zrobi:

```bash
npm install                  # zainstaluje paczki
# uruchomi postinstall
prisma generate && prisma db push
npm run build                # Next.js build
```

`prisma db push` utworzy (lub zaktualizuje) tabele w MySQL, w tym brakującą kolumnę **Users**.

Po 2–3 minutach zobaczysz zielone ✓ **Production Deployment Completed**.

---

## 6. Sprawdź aplikację

Klikasz adres produkcyjny (coś w stylu `https://hogs-crm.vercel.app`),
wchodzisz na `…/kontrahenci`, dodajesz firmę – rekord zapisuje się w bazie i od razu pojawia na liście.

---

## 7. Kolejne zmiany

```bash
git commit -am "Opis zmiany"
git push origin main
```

Każdy push = automatyczny redeploy na Vercel.  
Jeśli edytujesz modele w `prisma/schema.prisma`, `prisma db push` w `postinstall` zadba o synchronizację bazy.

---

## 8. Dev lokalnie (opcjonalnie)

```bash
npm install
npm run dev
```

Domyślnie łączy się z tą samą bazą produkcyjną.
Jeśli chcesz lokalną – zmień `DATABASE_URL` w `.env.local`.

---

## 9. Narzędzia

* **Prisma Studio** – podgląd danych  
  ```bash
  npx prisma studio
  ```  
  Wejdź w przeglądarce na `http://localhost:5555`.
* **DBeaver / HeidiSQL** – graficzny klient MySQL.

---

## 10. FAQ

| Sytuacja | Rozwiązanie |
|----------|-------------|
| Deploy czerwony (`Can't reach database server`) | Zła wartość `DATABASE_URL` lub MySQL blokuje IP Vercela. |
| Błąd 409 „Firma z takim NIP‑em już istnieje” | W bazie jest już rekord z tym samym `CompanyVat`. |
| Muszę zmienić schemat bazy | Edytuj `schema.prisma` → commit → push. `prisma db push` zrobi ALTER TABLE na produkcji. |

Miłej pracy! 🚀
