# Revolut Business — note de cadrage Lumière Commune

## Périmètre de cette version

Lumière Commune prépare un registre de paiements associé aux demandes, fiches de mission et documents. Cette version est **manuelle et non transactionnelle** : elle ne contient pas de clé Revolut, n’enregistre pas de bénéficiaire bancaire et n’appelle pas l’endpoint de paiement. Aucun virement ne peut être déclenché depuis l’interface actuelle.

Le registre utilise `revolut_business` comme fournisseur déclaré, avec des états internes : « à préparer », « à valider », « autorisé », « envoyé (manuel) », « rapproché », « échoué » et « annulé ». La mention « envoyé » signifie uniquement qu’une action humaine a été déclarée dans le registre ; elle ne constitue pas une preuve bancaire.

## Circuit documentaire

1. Un devis est préparé et rattaché à la demande.
2. Une fiche de mission est générée à partir d’une demande et d’un talent présélectionné.
3. Les consentements de l’organisateur, du talent et, lorsque nécessaire, de la structure sont recueillis séparément.
4. La fiche passe en relecture juridique uniquement lorsqu’un cadre de relecture est associé et que les consentements sont documentés.
5. Une facture peut être ajoutée au dossier après validation humaine.
6. Un paiement peut être préparé dans le registre, sans exécution automatique.

## Intégration future

Une intégration Revolut Business devra être activée uniquement après validation du cadre juridique, de la structure porteuse et des obligations comptables/sociales. Le flux cible devra prévoir :

- un environnement sandbox séparé de la production ;
- des secrets conservés côté serveur, jamais dans le navigateur ;
- une clé d’idempotence par instruction de paiement ;
- une correspondance explicite entre référence de document, mission et instruction externe ;
- une journalisation des demandes et réponses sans stocker de données bancaires inutiles ;
- une validation humaine distincte de la préparation technique ;
- un rapprochement bancaire explicite et réversible en cas d’échec ;
- une procédure d’arrêt en cas de litige, retrait du consentement ou anomalie.

Le endpoint `/pay` et les paramètres exacts devront être revalidés dans la documentation Revolut Business au moment de l’implémentation, car ils peuvent dépendre du compte, de la région et du niveau d’habilitation API. La version actuelle ne doit pas être présentée comme une intégration de paiement active.

## Garde-fous produit

- Une fiche de mission n’est pas un contrat de travail et ne remplace pas une vérification juridique.
- La rémunération affichée est une donnée de préparation ; elle ne garantit ni statut social, ni revenu, ni résultat.
- La cible de 3 000 € par mois reste un objectif d’activité et non une promesse.
- Les partenariats et la marraine juridique restent « proposés » ou « en discussion » jusqu’à validation écrite.
- Aucun paiement à une personne en situation de vulnérabilité ne doit être déclenché sans vérifier le cadre légal, social, fiscal et l’accord de la personne ou de la structure concernée.
