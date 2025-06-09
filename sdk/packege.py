# sdk/regras.py

def aplicar_regras(dados):
    score = 0

    if dados.get('tempo_na_pagina', 0) < 3:
        score += 30

    if not dados.get('movimento_mouse'):
        score += 30

    if dados.get('dispositivo_novo'):
        score += 20

    if dados.get('ip_suspeito'):
        score += 20

    return min(score, 100)
