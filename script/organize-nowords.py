#!/usr/bin/env python3
"""
Organizes img/nowords/ flat files into subfolders by name prefix,
then updates all src references in img/*.html gallery pages.
"""

import os
import shutil
import glob
from collections import defaultdict

BASE = "/Users/erictsai/devfiles/eetom.github.io"
NOWORDS = os.path.join(BASE, "img/nowords")

# Ordered list of (prefix, folder) — longer/more specific first
PREFIX_RULES = [
    ("2024-07-20",          "2024-07-20"),
    ("7artisan",            "7artisan"),
    ("Acros",               "Acros"),
    ("Arista",              "Arista"),
    ("Ballard",             "Ballard"),
    ("Bellevue",            "Bellevue"),
    ("Bobcorn",             "Bobcorn"),
    ("Calgary-",            "Calgary-bw"),
    ("calgary",             "calgary-dg"),
    ("Canon-beach",         "canonbeach"),
    ("canonbeach",          "canonbeach"),
    ("DSC_",                "DSC"),
    ("DX_June2025",         "DX_June2025"),
    ("edited_DSC",          "edited_DSC"),
    ("Espana",              "Espana"),
    ("FerryFilmPentax",     "FerryFilmPentax"),
    ("FoF_extra",           "FoF"),
    ("Food",                "Food"),
    ("FujiBellingham",      "FujiBellingham2024"),
    ("FujiColorado",        "FujiColorado"),
    ("FujiTexas",           "FujiTexas"),
    ("hawaii",              "hawaii"),
    ("japan2016",           "japan2016"),
    ("jpbw",                "jpbw"),
    ("jpc",                 "jpc"),
    ("Kent-",               "Kent"),
    ("labbox",              "lab-notes"),
    ("MF6-Bellevue",        "MF6-Bellevue"),
    ("Marymoor",            "Marymoor"),
    ("monobath",            "lab-notes"),
    ("montreal",            "montreal"),
    ("p400-tw",             "p400-tw"),
    ("Palmsprings",         "Palmsprings"),
    ("Random",              "Random"),
    ("Roadtrip-pt2",        "roadtrip"),
    ("roadtrip",            "roadtrip"),
    ("roting",              "roting"),
    ("Sakura",              "Sakura"),
    ("sf-may",              "sf-may"),
    ("Summer",              "Summer"),
    ("Texas_gr10",          "Texas"),
    ("TW-bw",               "TW-bw"),
    ("Travel",              "Travel"),
    ("tulips",              "tulips"),
    ("Vancouver",           "Vancouver"),
    ("Washington",          "Washington"),
    ("waterfront",          "waterfront"),
    ("Whidbey",             "Whidbey"),
    ("renan_marek_grind",   "lab-notes"),
    ("test-",               "lab-notes"),
    ("turbo",               "lab-notes"),
    ("Chocolate",           "Food"),
    ("Hotpot",              "Food"),
    ("Pasta",               "Food"),
    ("pizza",               "Food"),
    ("coffee_beans",        "Food"),
    ("nescafe_kopi_c",      "Food"),
    ("yellow_bourbon",      "Food"),
    ("Beach",               "misc"),
    ("Bear",                "misc"),
    ("Books",               "misc"),
    ("Border",              "misc"),
    ("Botanical",           "misc"),
    ("Boulder",             "misc"),
    ("Cameras",             "misc"),
    ("Deloitte",            "misc"),
    ("Dicks",               "misc"),
    ("Firewatch",           "misc"),
    ("Keyboard",            "misc"),
    ("Kirkland",            "misc"),
    ("Lakeview",            "misc"),
    ("Medina",              "misc"),
    ("Mountain",            "misc"),
    ("Old-streets",         "misc"),
    ("Outdoor",             "misc"),
    ("Planter",             "misc"),
    ("Relax",               "misc"),
    ("Revolver",            "misc"),
    ("Sunrise",             "misc"),
    ("Sunset",              "misc"),
    ("Techbro",             "misc"),
    ("Trail",               "misc"),
    ("Words_3",             "misc"),
]

def get_folder(filename):
    for prefix, folder in PREFIX_RULES:
        if filename.startswith(prefix):
            return folder
    return None

# Step 1: plan moves
moves = {}
skipped = []

for name in sorted(os.listdir(NOWORDS)):
    if os.path.isdir(os.path.join(NOWORDS, name)):
        continue
    folder = get_folder(name)
    if folder:
        moves[name] = folder
    else:
        skipped.append(name)

by_folder = defaultdict(list)
for fname, fld in sorted(moves.items()):
    by_folder[fld].append(fname)

print(f"Moving {len(moves)} files into {len(by_folder)} folders:")
for fld in sorted(by_folder):
    print(f"  {fld}/  ({len(by_folder[fld])} files)")

if skipped:
    print(f"\nUnmatched (staying in root):")
    for f in skipped:
        print(f"  {f}")

# Step 2: create folders and move
for fld in set(moves.values()):
    os.makedirs(os.path.join(NOWORDS, fld), exist_ok=True)

for fname, fld in sorted(moves.items()):
    shutil.move(os.path.join(NOWORDS, fname), os.path.join(NOWORDS, fld, fname))

print(f"\nMoved {len(moves)} files.")

# Step 3: update HTML src references
print("\nUpdating HTML files...")
html_files = sorted(set(
    glob.glob(os.path.join(BASE, "img/*.html")) +
    glob.glob(os.path.join(BASE, "index.html")) +
    glob.glob(os.path.join(BASE, "notes/*.html"))
))

files_updated = []
for html_path in html_files:
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    for fname, fld in moves.items():
        content = content.replace(f'nowords/{fname}', f'nowords/{fld}/{fname}')
    if content != original:
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(content)
        files_updated.append(os.path.relpath(html_path, BASE))

print(f"Updated {len(files_updated)} HTML files:")
for f in files_updated:
    print(f"  {f}")

print("\nDone!")
