import { Component, OnInit } from '@angular/core';
import { EquipmentManagerService } from '../item/services/equipment-manager.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

  constructor(public equipmentManagerService: EquipmentManagerService) { }

  ngOnInit() {
  }

}
