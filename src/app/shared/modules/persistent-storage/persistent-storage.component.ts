import { Component, OnInit, Input } from '@angular/core';
import { PersistentStateService } from '../../../game/shared/services/persistent-state.service';
import defaults from '../../defaults';
import { ApplicationStateService } from '../../services/application-state.service';

@Component({
  selector: 'app-persistent-storage',
  templateUrl: './persistent-storage.component.html',
  styleUrls: ['./persistent-storage.component.scss']
})
export class PersistentStorageComponent implements OnInit {

  public objectKeys;
  public saveSlots;

  constructor(
    private persistentStateService: PersistentStateService,
    public applicationStateService: ApplicationStateService,
  ) {
    this.objectKeys = Object.keys;
    this.saveSlots = defaults.gameMenu.saveSlots;
  }

  ngOnInit() {
  }

  public getSaveIconImageSource(saveSlot: number) {

    const saveIconSrc = this.persistentStateService.getsaveIconSrcFromStorage(saveSlot);


    if (saveIconSrc) {
      return 'assets/images/save-icons/' + saveIconSrc;
    } else {
      return "default-save-icon.png";
    }
  }

  public saveGame(saveSlot) {
    this.persistentStateService.save(saveSlot);
  }

  public loadGame(saveSlot) {
    this.persistentStateService.load(saveSlot);
  }

  public deleteGame(saveSlot) {
    this.persistentStateService.delete(saveSlot);
  }

  public saveSlotDoesntExist(saveSlot: number): boolean {
    // TODO Intensely inefficient
    return !!(localStorage.getItem("save-slot-" + saveSlot));
  }

}
