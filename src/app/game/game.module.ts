import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { PlayerComponent } from './character/player/player.component';
import { NpcComponent } from './character/npc/npc.component';
import { EnemyComponent } from './character/enemy/enemy.component';
import { AreaComponent } from './area/area.component';
import { WeaponComponent } from './item/weapon/weapon.component';
import { PotionComponent } from './item/potion/potion.component';
import { KeyComponent } from './item/key/key.component';
import { ArmourComponent } from './item/armour/armour.component';
import { CharacterComponent } from './character/character.component';
import { DialogueComponent } from './dialogue/dialogue.component';
import { GameComponent } from './game.component';
import { AreaConfigProviderService } from './shared/services/area-config-provider.service';
import { PlayerStateService } from './shared/services/player-state.service';
import { DialogueService } from './shared/services/dialogue.service';
import { MovementComponent } from './shared/util/movement/movement.component';
import { BattleCalculatorComponent } from './shared/util/battle-calculator/battle-calculator.component';

@NgModule({
  imports: [
    CommonModule,
    GameRoutingModule
  ],
  declarations: [
    GameComponent,
    PlayerComponent,
    NpcComponent,
    EnemyComponent,
    AreaComponent,
    WeaponComponent,
    PotionComponent,
    KeyComponent,
    ArmourComponent,
    CharacterComponent,
    DialogueComponent,
    MovementComponent,
    BattleCalculatorComponent,
  ],
  providers: [
    AreaConfigProviderService,
    PlayerStateService,
    DialogueService,
    MovementComponent,
    BattleCalculatorComponent,
  ]
})
export class GameModule { }
