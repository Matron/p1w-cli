import { IComponent } from "./component";
import { IUpdate } from "../lifecycle/update";

type constructorOf<T> = { new( ...args: unknown[]): T }

export abstract class Entity implements IUpdate {
  protected _components: IComponent[] = [];

  public get components(): IComponent[] {
    return this._components;
  }

  public addComponent(component: IComponent): void {
    this._components.push(component);
    component.entity = this;
  }

  public getComponent<C extends IComponent>(constr: constructorOf<C>): C {
    for (const comp of this._components) {
      if (comp instanceof constr) {
        return comp as C;
      }
    }
    throw new Error(`${constr.name} not found in ${this.constructor.name}`);
  }

  public removeComponent<C extends IComponent>(constr: constructorOf<C>): void {
    let toRemove: IComponent | undefined;
    let index: number | undefined;

    for (let i=0; i<this._components.length; i++) {
      const comp = this._components[i];
      if (comp instanceof constr) {
        toRemove = comp;
        index = i;
        break;
      }
    }

    if (toRemove && index) {
      toRemove.entity = null;
      this._components.splice(index, 1);
    }
  }

  public awake(): void {
    for (const comp of this._components) {
      comp.awake();
    }
  }

  public update(deltaTime: number): void {
      for (const comp of this._components) {
        comp.update(deltaTime);
      }
  }
}
