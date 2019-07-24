import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerStateService } from './shared/services/player-state.service';
import { DialogueService } from './shared/services/dialogue.service';
import { UserInputService } from '../shared/services/user-input.service';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { AiService } from './shared/services/ai.service';
import { EquipmentManagerService } from './item/services/equipment-manager.service';
import { AreaStateService } from './shared/services/area-state.service';

@Component({
  selector: 'app-game-root',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  title = 'game';

  constructor(
    public playerStateService: PlayerStateService,
    public equipmentManagerService: EquipmentManagerService,
    public dialogueService: DialogueService,
    public userInputService: UserInputService,
    public aiService: AiService,
    public areaStateService: AreaStateService,
  ) { }

  ngOnInit(): void {
    this.subscription = fromEvent(document, 'keydown').subscribe(($e: KeyboardEvent) => {
      this.userInputService.keyDownEventHandler($e);
    });
    const tempHealth = this.playerStateService.health;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  // public onKeyDown($e) {
  //   this.userInputService.keyDownEventHandler($e);
  // }



  // TODO: Look for a way to check menu on site load
}
