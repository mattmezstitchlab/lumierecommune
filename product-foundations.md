# Fondations produit — Lumière Commune

## Proposition et périmètre de la première version

Lumière Commune est une plateforme de coordination pour mariages et événements qui met en relation des organisateurs avec des talents sur la base des compétences, de la disponibilité et de conditions de mission explicites. Les personnes accompagnées par des associations peuvent participer au même titre que les autres talents, sans affichage de leur situation personnelle. Toute participation repose sur un consentement libre, explicite et révocable.

La première version couvre l’expression d’un besoin, le dépôt d’un profil, la découverte d’un annuaire, la présélection et le suivi de coordination. Elle ne remplace pas un contrat de travail, un dispositif social, une vérification d’identité ni un conseil juridique. Les partenaires sont affichés uniquement avec un statut factuel : « partenaire validé » ou « en cours d’échange ».

## Parcours de référence

| Public | Entrée | Action structurante | Résultat visible |
| --- | --- | --- | --- |
| Organisateur | « Publier une demande » | Décrit date, lieu, budget, besoins et contact | Une demande privée, prête à être coordonnée |
| Talent | « Rejoindre le réseau » | Dépose un profil de compétences, une zone, une disponibilité et son consentement | Un profil visible seulement s’il est approuvé et consentant |
| Structure partenaire | « Devenir partenaire » | Transmet son cadre d’accompagnement et ses critères | Une candidature soumise à validation humaine |
| Coordination | Espace de suivi | Fait évoluer une demande de nouvelle à confirmée | Une trace datée, lisible et limitée aux personnes autorisées |

## Modèle de données et règles de protection

La base comporte des tables séparées pour les demandes, profils, disponibilités, présélections de profils, signalements et candidatures partenaires. La confidentialité des contacts est structurante : les coordonnées de l’organisateur restent dans son suivi et ne sont pas exposées dans l’annuaire. Les profils publics ne comportent ni étiquette de précarité, ni données médicales, ni récit personnel imposé.

| Objet | Données principales | Règle de sécurité |
| --- | --- | --- |
| Demande | Date, lieu, budget, besoins, contact, état | Créée par un organisateur authentifié ; le détail est réservé à son suivi et à la coordination autorisée |
| Talent | Nom professionnel, compétences, zone, bio, disponibilité, consentement | Visible dans l’annuaire seulement si consentement et validation partenaire sont actifs |
| Présélection | Demande, profil, note de coordination, état | Accessible au propriétaire de la demande et à la coordination ; jamais publique |
| Signalement | Catégorie, message, référence facultative, état | Privé, horodaté et affiché uniquement à l’administration |
| Partenaire | Nom de structure, site, cadre, état | Statut « en cours d’échange » par défaut ; seule une validation admin peut le rendre public comme validé |

## Économie transparente

Le modèle proposé intègre une **frais de coordination** à la prestation, communiqué avant toute confirmation. La contribution solidaire reste volontaire, distincte et modifiable avant validation. Une cible de 3 000 € mensuels est un seuil d’activité, non une promesse de revenu : elle peut par exemple correspondre à 20 dossiers à 150 € de coordination, ou à 8 formules Essentielle à 180 € et 4 formules Collectif à 390 €.

> Avertissement financier : ce modèle est une hypothèse de fonctionnement, non une garantie de chiffre d’affaires ou de revenu. La viabilité dépend du volume réel de demandes, du coût d’acquisition, des charges, des obligations sociales et fiscales, ainsi que des accords conclus avec les partenaires.

| Offre | Usage | Frais de coordination affichés | Inclus dans la version initiale |
| --- | --- | ---: | --- |
| Essentielle | Une équipe ou une prestation ciblée | 180 € | Qualification du besoin et présélection accompagnée |
| Collectif | Mariage ou événement à plusieurs métiers | 390 € | Coordination multi-profils et suivi des étapes |
| Sur mesure | Événement complexe ou réseau partenaire | Sur devis | Cadrage humain renforcé et organisation adaptée |

## Cadre d’usage à afficher dans l’interface

La plateforme présente une charte de rémunération juste : aucune mission ne doit être proposée sans conditions claires, sans coût convenu ou sans accord de la personne. Le profil comporte une case de consentement distincte de l’acceptation des conditions. Un signalement est accessible depuis le pied de page et depuis l’espace de mission. La mise en relation n’est déclenchée qu’après une validation interne et, lorsque concerné, l’accord documenté de la structure partenaire.
