# Vérification d’accessibilité — Lumière Commune

La vérification a été menée sur les pages d’accueil, demande, profil talent, annuaire, association, protection et suivi, aux formats ordinateur (1280 px) et mobile (375 px). Les contrôles ci-dessous s’appuient sur le rendu et sur les composants effectivement utilisés dans l’interface. Ils constituent une vérification de pré-lancement ; un audit avec de vrais utilisateurs et un lecteur d’écran reste recommandé avant une diffusion publique.

| Point contrôlé | Vérification effectuée | Résultat |
| --- | --- | --- |
| Parcours au clavier | Les éléments interactifs sont des liens, boutons, champs, cases à cocher, boutons radio ou listes natives. Les actions principales ont un libellé visible. | Conforme pour les parcours publics et formulaires. |
| Focus visible | Les champs utilisent une bordure et une ombre de focus corail ; les composants bouton fournis conservent leur état de focus visible. | Conforme, à recontrôler avec les styles navigateur réels avant publication. |
| Libellés de formulaire | Les champs des demandes, profils, partenaires et signalements sont associés à des éléments `label` visibles. | Conforme. |
| Erreurs et contraintes | Les champs obligatoires utilisent les contraintes HTML natives ; les règles métier renvoient des messages par notification et sont validées côté serveur. | Conforme pour les validations couvertes ; prévoir des messages d’erreur contextualisés par champ lors d’une itération ultérieure. |
| Contraste et lisibilité | Le texte courant est affiché en encre sur fond ivoire/blanc, ou en ivoire sur fond encre. La palette lime est réservée aux accents et ne porte pas seule des informations essentielles. | Conforme au contrôle visuel. |
| Contenus non textuels | Les deux images éditoriales possèdent un texte alternatif décrivant la scène, sans information de profil personnel. | Conforme. |
| Mobile | Les captures à 375 px confirment l’empilement des contenus, l’accès au menu et la lisibilité des formulaires sans débordement observé. | Conforme. |

## Limites connues

La version initiale n’intègre pas encore de test automatisé avec lecteur d’écran, ni de test de navigation au clavier instrumenté dans un navigateur réel. Avant un lancement commercial, il est conseillé de compléter ce contrôle avec une revue WCAG 2.2 par un spécialiste et une session de test avec des utilisateurs concernés.
